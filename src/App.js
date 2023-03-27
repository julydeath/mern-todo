import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Button,
  theme,
  Input,
  Flex,
  Card,
  CardBody,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = async e => {
    //e.preventDefault();
    await axios
      .post('http://localhost:1337/api/add-task', {
        task: todo,
      })
      .then(response => {
        console.log(response);
      });
    setTodo('');
  };

  const FetchData = async () => {
    const data = await axios.get('http://localhost:1337/api/get-all');
    console.log(data.data);
    setTodos(data.data);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <form onSubmit={e => handleSubmit(e)}>
        <Flex>
          <Input
            focusBorderColor="lime"
            placeholder="Enter ToDo"
            type="text"
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
          <Button colorScheme="green" onClick={e => handleSubmit(e)}>
            ADD
          </Button>
        </Flex>
      </form>
      {todos.map(list => (
        <Card key={list.id}>
          <CardBody>
            <Flex>
              <Text>{list.task}</Text>
              <DeleteIcon />
            </Flex>
          </CardBody>
        </Card>
      ))}
    </ChakraProvider>
  );
}

export default App;
