import { SessionStatus } from '../src/domain/Session';
import { SessionDynamoDBRepository } from '../src/infrastructure/SessionDynamoDBRepository';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

describe('SessionDynamoDBRepository', () => {
  const client = new DynamoDB({ region: 'eu-west-1', endpoint: 'http://localhost:4566' });

  beforeEach(async () => {
    await client.createTable({
      AttributeDefinitions: [
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'name',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: 'Sessions',
    });
  });

  afterEach(async () => {
    await client.deleteTable({ TableName: 'Sessions' });
  });

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

    const retrievedSession = await client.getItem({ TableName: 'Sessions', Key: { name: { S: 'aSessionName' } } });
    expect(retrievedSession.Item).toEqual(session);
  });
});
