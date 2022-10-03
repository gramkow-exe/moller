O projeto Moller consiste em um protótipo de rede social para fins de estudos.

Entre as principais classes estão:


![alt text](https://i.imgur.com/1EEuDQ3.png)



Para testar a aplicação, você deve clonar o repositório, e no terminal acessar a pasta do backend, seguido do comando “npm i” para instalar as dependências necessárias. Para rodar, escreva o comando “npm run dev”. Após rodar o backend, é possível ver o retorno de todas as classes na rota: http://localhost:3000/teste-classes/all
Como corpo de requisição, já que a rota é de tipo POST recomendo utilizar:

{
	"content":"teste classes post",
	"email" : "walmor@gmail.com",
	"password" : "walmor", 
	"name" : "walmor", 
	"avatar" : "https://171dxwjpaqv2danpq11ixf2j-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/a-mole-is-4-7-inches-in-length-with-paddle-shaped-1.jpeg",
	"comment": "Comentário"
}

Este corpo leva todas as variáveis necessárias para o teste geral, porém existem rotas específicas para as classes principais, como Usuário (que conta com CRUD) e posts. O resultado do teste deve se assemelhar à imagem abaixo:

![alt text](https://i.imgur.com/pZtKKlp.png)


Para testar o front-end, lembre-se de rodas ambas as aplicações com "npm run dev" e estar conectado a internet, para que as imagens sejam carregadas.

Como login de teste, pode ser utilizado o a seguir:
email: gramkowigor@gmail.com
senha: moles




![alt text](https://i.imgur.com/SIbwals.png)

