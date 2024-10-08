const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body},)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
