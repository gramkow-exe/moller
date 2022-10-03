O projeto Moller consiste em um protótipo de rede social para fins de estudos.

Entre as principais classes estão:


![alt text](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTjZ2fbQ_UzRfpzOczl5ZfYF87hfns-uyvnJfu_d67ha3QnPlnCkY5z8BGvZFgdbL82lUKEB44=w1868-h952)



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

Este corpo leva todas as variáveis necessárias para o teste geral, porém existem rotas específicas para as classes principais, como Usuário (que conta com CRUD) e posts.

Para testar o front-end, lembre-se de rodas ambas as aplicações com "npm run dev" e estar conectado a internet, para que as imagens sejam carregadas.

Como login de teste, pode ser utilizado o a seguir:
email: gramkowigor@gmail.com
senha: moles




![alt text](https://lh3.googleusercontent.com/fife/AAbDypDO_hFwgu0KTB4tv2h-Jxl1ZRNHCcpmja2x3Y3d8GXfgyRMIzLGOR0TmqSXqOOd48U1jcvhdjXyZYR7R3kR0oLiuYkrSDjadyfW8HICiJOOv0W56rJirZcGpjjmclkHUnsjgmQfU7k_74OxUGadnZKKHozdkGTcYmuYCE1Q7dJ-Bc_YOGml6cpjszySAJF2vqodogXNeKp-epRMGVstLSGwWlIIbLnbE3FvPRFP4AU9NJOBceih1rpb_fEnmWJx2dguQ2RBVPeb0FXMf5CDeembh2NeXDnRrBGODd1dnqzjnBttMe2KRUqPzfELo0goIXSxyD2QDWGyzxEEyh2R1BZGWG438cAMx73P60z1z5cnT1KPND4XVwiIrhnkWHaJhyq9dPLU4Ir-pSqLRBbCs02yiZU2UXTBvtL4C2SnpFlvZW2flxNXdsRt1Wpi2aYejGKXCo8JVhmtA1gMd_Gwra7eE3qwr_kJl82DCIDv0odnGwmxnZztBayMwSKAnnidYaxa4753taA2QC5-Thbe9eP3md67f7ttHXhacPOwkR3RrlFVtJcx7GLm1da7p6kpU3gmQzHJNa8NX2wFQupjkNp0BxMj2E4qeqQASAsopIed9wmyVssW0FwTiCMe8SAT9wiyqaxIHM-cE77ukO7K5qBSXSs26_j8qwuaPLs2QFFSIIAXw1PYGJP9aY7sgq2bVtaBM6k7k0F6KD7h-Pxl_IWtCYQ4gawwfC_6bHZJ_wmQ7ymcawqVcwXbWEyL3IbSs6ALVrX6dTqof9R5N6CN2f1wNp7Oebk7652tt7mx1-wB4IB34Yhc8A1uALwRVfxSypz20XWwILLCyn0RcMlPmlUfHk0Sg9rnPm3Axs3Mo9-PmTF9z4TGCxt7sYntuhQkPEfiTW3P4MM_T2bK5xkkhcmUZBMyeoZ4vZFZrfg9Ikh2CLwmbOpSxKjiImMF5zmS6XOEM0h63zlHc_Czn36iDH5LXdmV1BK-B_aRt_9TB7q2GxIqJBk-uPsOlJJ-0BC-BZ1lwj1QVMN9TlnrYC-oEsWTRuh8oVWU97YFHldIKVpeJk3OOnH7dK2xnCA80R0AP3xjJFeNJcZyli3f2-lIql9YrGHiYefPAjEZU5ExZ8L26RhAY_g9jzivnBv7F9Q_idPyf8davEdyTF9t6_1h0xpovFSrCmU2hwFdZPYJxbao_WTfPlSZ0HEB099gwxmdaUEGPjAAQka2EYRHBDKoHhTDfZ6PaN-sz3zLLmZw0uVmkCGXhoH6b3YSaSzjFfjvmnMTlxS8eUMCYn-CZGDl_GLTtTJ_2Kl03fjUJ408hFLfCOzuEcESo96wXZuQVeuN6uodSCV6S5SfUIsSi_WREMntDdQLCOCpPGetXsnNEuprlKMuXBlMrTL6ASJUtsIcH1QuLocopR7DwIUGQooMLMLIr8Dvvwufhk4JzaEiRT0chMob5vn7HxZMRQi_QJjUXVVgFien-MwYmiYgHfDpW2STd5xlXpBalGdy0qk4IGBpuGNFOEes=w10000-h10000)

