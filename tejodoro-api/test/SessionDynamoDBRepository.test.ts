import { SessionStatus } from '../src/domain/Session';
import { SessionDynamoDBRepository } from '../src/infrastructure/SessionDynamoDBRepository';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

describe('SessionDynamoDBRepository', () => {
  const client = new DynamoDB({ region: 'eu-west-1', endpoint: 'http://localhost:4566', credentials: { accessKeyId: '', secretAccessKey: '' } });

  it('should save a new session', async () => {
    const session = {
      name: 'aSessionName',
      status: {
        name: SessionStatus.POMODORO,
        endTime: Date.now(),
      },
      participants: ['fran'],
    };
    const repository = new SessionDynamoDBRepository(client);

    await repository.save(session);

    const { Item: sessionItem } = await client.getItem({ TableName: 'Sessions', Key: { name: { S: 'aSessionName' } } });
    const unmarshalledSession = unmarshall(sessionItem!);
    const retrievedSession = { ...unmarshalledSession, participants: Array.from(unmarshalledSession.participants) };
    expect(retrievedSession).toEqual(session);
  });
});
