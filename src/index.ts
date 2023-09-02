import express from 'express';
import {PrismaClient} from '@prisma/client';

const app = express();
const PORT = 4000;
const prisma = new PrismaClient();

app.use(express.json());
// Created

app.post('/users', async (req, res, next) => {
  const {name, email} = req.body;
  const result = await prisma.users.create({
    data: {
      name: name,
      email: email,
    },
  });
  res.json({
    message: 'Created Success',
    data: result,
  });
});

app.get('/users', async (req, res, next) => {
  const result = await prisma.users.findMany();
  res.json({
    message: 'Get Success',
    data: result,
  });
});

app.patch('/users/:id', async (req, res, next) => {
  const {id} = req.params;
  const {name, email} = req.body;
  const result = await prisma.users.update({
    data: {
      name: name,
      email: email,
    },
    where: {
      id: Number(id),
    },
  });
  res.json({
    message: 'Patch Success',
    data: `User ${id} Updated`,
  });
});

app.delete('/users/:id', async (req, res, next) => {
  const {id} = req.params;
  const result = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({
    message: `Delete ${id} Success`,
  });
});

app.listen(PORT, () => {
  console.log('Server Run', PORT);
});
