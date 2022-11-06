import { Session } from '../domain/Session';
import { SessionRepository } from '../domain/SessionRepository';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export class SessionDynamoDBRepository implements SessionRepository {
  constructor(private client: DynamoDB) {}

  async get(name: string): Promise<Session> {
    const { Item: sessionItem } = await this.client.getItem({ TableName: 'Sessions', Key: { name: { S: name } } });
    const unmarshalledSession = unmarshall(sessionItem!);
    const retrievedSession = { ...unmarshalledSession, participants: Array.from(unmarshalledSession.participants)};
    return retrievedSession as Session;
  }

  async save(session: Session) {
    await this.client.putItem({
      Item: {
        name: { S: session.name },
        participants: { SS: session.participants },
        status: { M: { name: { S: session.status.name }, endTime: { N: session.status.endTime.toString() } } },
      },
      TableName: 'Sessions',
    });
  }
}
