import { Session } from '../domain/Session';
import { SessionRepository } from '../domain/SessionRepository';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export class SessionDynamoDBRepository implements SessionRepository {
  constructor(private client: DynamoDB) {}

  async get(name: string): Promise<Session> {
    throw new Error('Method not implemented.');
  }

  async save(session: Session) {
    await this.client.putItem({
      Item: {
        name: { S: session.name },
        participants: { SS: session.participants },
        status: { M: { name: { S: session.name }, endTime: { N: session.status.endTime.toString() } } },
      },
      TableName: 'Sessions',
    });
  }
}
