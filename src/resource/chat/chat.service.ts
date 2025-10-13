import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, Message, User } from '../../entities';
import { AuthenticatedWebSocket } from './types/authenticated-websocket';

@Injectable()
export class ChatService {
  [x: string]: any;
  private clients = new Map<number, AuthenticatedWebSocket>();

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  addClient(userId: number, socket: AuthenticatedWebSocket) {
    this.clients.set(userId, socket);
  }

  removeClient(userId: number) {
    this.clients.delete(userId);
  }

  async createChat(ownerId: number, name: string, type?,): Promise<Chat> {
    const owner = await this.userRepo.findOne({ where: { id: ownerId } });
    if (!owner) throw new Error('User not found');

    const chat = this.chatRepo.create({
      name,
      ownerId,
      type,
      members: [owner],
    });

    return this.chatRepo.save(chat);
  }

  async inviteUser(inviterId: number, chatId: number, userId: number): Promise<boolean> {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['members'],
    });
    if (!chat || chat.ownerId !== inviterId) return false;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return false;

    if (!chat.members.find((m) => m.id === userId)) {
      chat.members.push(user);
      await this.chatRepo.save(chat);
    }

    return true;
  }

  async addMessage(userId: number, chatId: number, text: string) {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['members', 'messages'],
    });

    if (!chat || !chat.members.find((m) => m.id === userId)) {
      throw new NotFoundException('Chat not found or user not a member');
    };
    if (!text || !text.trim()) {
      throw new Error('Message text cannot be empty');
    }


    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return null;

    const message = this.messageRepo.create({ text, user, chat });
    const savedMessage = await this.messageRepo.save(message);

    this.broadcastToChat(chat.id, { event: 'message', data: savedMessage });

    return savedMessage;
  }

  broadcastToChat(chatOrId: number | Chat, payload: any) {
    if (typeof chatOrId === 'number') {
      this.chatRepo.findOne({ where: { id: chatOrId }, relations: ['members'] }).then((chat) => {
        if (!chat) return;
        this.sendToMembers(chat.members, payload);
      });
    } else {
      this.sendToMembers(chatOrId.members, payload);
    }
  }

  private sendToMembers(members: User[], payload: any) {
    members.forEach((member) => {
      const client = this.clients.get(member.id);
      if (client && client.readyState === client.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });
  }
}