O projeto Moller consiste em um protótipo de rede social para fins de estudos.

### Entre as principais classes estão:


![alt text](https://i.imgur.com/QZel4K6.png)


## Como iniciar?

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




## Backend:

O Backend da aplicação consiste em uma api REST em typescript. A mesma faz contato com um banco de dados utilizando uma biblioteca chamada Prisma, que faz o modelo das tabelas, assim como, facilita a movimentação de dados dentro das mesmas.

Para testar o backend, basta utilizar um app ou comando de teste de rotas, escolher uma rota criada e mandar as informações necessárias. Lembrando que o mesmo deve estar rodando na porta de sua máquina, e que, o link utilizado pras rotas tem como base o endereço do seu computador.


Exemplo de rota: Get Posts

Parâmetros: Necessita de um id de usuário para retornar caso o post foi curtido ou não pelo usuário (parâmetro: id)


![alt text](https://i.imgur.com/NuRe0VT.png)


## Teste JWT:

Logar em conta exemplo:

	curl localhost:3000/login -X POST -H "Content-Type:application/json" -d "{\"email\": \"gramkowigor@gmail.com\", \"password\": \"62a7b38fa43c3b1dbbb91929c28fdfbe\"}"

Você recebe um token, que sera passado na rota de posts, para que as informações sejam condizentes com o perfil:

	curl http://localhost:3000/posts -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE5vdiAwOSAyMDIyIDIzOjE5OjM2IEdNVC0wMzAwIChIb3LDoXJpbyBQYWRyw6NvIGRlIEJyYXPDrWxpYSkiLCJlbWFpbCI6ImdyYW1rb3dpZ29yQGdtYWlsLmNvbSIsImlhdCI6MTY2ODA0Njc3Nn0.7Xa-554J9I8YopD9ook0BAFfQksfTz2mbOzowWeY4fM"


### Documentação das Rotas:

https://drive.google.com/uc?export=download&id=1dV0ICXrahGb4JZd7MSWpzY9kmhxv8Err


## Utilização

### Upload de imagens:

![alt text](https://i.imgur.com/iz3CxzJ.png)


### Página de Usuário:

![alt text](https://i.imgur.com/pf52yL7.png)

### Página para editar o usuário:

![alt text](https://i.imgur.com/omkum5y.png)

### Página inicial:

![alt text](https://i.imgur.com/cKQnsSK.png)








