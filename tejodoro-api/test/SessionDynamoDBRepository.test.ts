import { SessionStatus } from '../src/domain/Session';
import { SessionDynamoDBRepository } from '../src/infrastructure/SessionDynamoDBRepository';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

describe('SessionDynamoDBRepository', () => {
  const client = new DynamoDB({
    region: 'eu-west-1',
    endpoint: 'http://localhost:4566',
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
  });

  const session = {
    name: 'aSessionName',
    status: {
      name: SessionStatus.POMODORO,
      endTime: Date.now(),
    },
    participants: ['fran'],
  };

  let repository: SessionDynamoDBRepository;

  beforeEach(async () => {
    repository = new SessionDynamoDBRepository(client);
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
    await repository.save(session);

    const { Item: sessionItem } = await client.getItem({ TableName: 'Sessions', Key: { name: { S: 'aSessionName' } } });
    const unmarshalledSession = unmarshall(sessionItem!);
    const retrievedSession = { ...unmarshalledSession, participants: Array.from(unmarshalledSession.participants) };
    expect(retrievedSession).toEqual(session);
  });

  it('should get the persisted session session', async () => {
    await repository.save(session);

    const retrievedSession = await repository.get(session.name);

    expect(retrievedSession).toEqual(session);
  });
});
