 

![flowchart](/home/abhiram/Documents/Docs/flowchart.png)



### Code Flow

1. User register in the web app (Web3.newUser(),writeToDB() ,authService.register(), registration component );
2. User Login to the web app(authService.login(), login component )
3. User Submit Article (Works only for articles from medium.com)
   1. User Paste the link in provided space
   2. Preview and hash  is generated(getPreview(), template.preview())
   3. On submisson an address is allocated to the article and data is stord in blockchain and database (web3.newArticle(), icleService.newArticle() )
4. User can vote for article published( web3.vote() )

