import { User } from '../models';

export const welcomeMessage = (request, response) => {
  response.send('welcome to sendIT-backend');
}

export const signUP = async (request, response) => {
  const { username } = request.body;
  const email = request.body.email;
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;

  if (!username) {
    return response.status(401).json({
      errorMessage: 'Name is required'
    })
  }

  if (password !== confirmPassword) {
    return response.status(401).json({
      errorMessage: 'Passwords do not match'
    })
  }

  const results = new User(request.body);
  await results.save()

  return response.status(201).send(results);
}
