# queue like a boss, the stress test

## run rabbitmq test
```bash
docker run -d -p 4369:4369 -p 5671:5671 -p 5672:5672 -p 25672:25672 --name test-rabbit rabbitmq:3
npm run option-amqplib-server
npm run option-amqplib-worker
npm run stress
```

## run bull test
```bash
docker run -d -p 6379:6379 --name redis redis:3
npm run option-bull-server
npm run option-bull-worker
npm run stress
```

## run kue test
```bash
docker run -d -p 6379:6379 --name redis redis:3
npm run option-kue-server
npm run option-kue-worker
npm run stress
```
