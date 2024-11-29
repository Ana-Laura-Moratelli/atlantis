<h1>🏨 Atlantis</h1>

<h2>💻 Tecnologias utilizadas: </h2>
<div>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&color=000000" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white&color=000000" />
    <img src="https://img.shields.io/badge/Mysql-339933?style=for-the-badge&logo=mysql&logoColor=white&color=000000" />
    <img src="https://img.shields.io/badge/React-339933?style=for-the-badge&logo=React&logoColor=white&color=000000" />
    <img src="https://img.shields.io/badge/Tailwind CSS-339933?style=for-the-badge&logo=tailwindcss&logoColor=white&color=000000" />
</div>

<h2>:hammer_and_wrench: Como executar</h2>

<h3>Passo 1: Clone o Repositório</h3>
<pre><code>git clone https://github.com/Ana-Laura-Moratelli/atlantis -b atvv</code></pre>

<h3>Passo 2: Instale as dependências</h3>
<p>No frontend e backend:</p>
<pre><code>npm install</code></pre>

<h3>Passo 3: Configure o MySQL</h3>
<p>Na pasta bd estão disponíveis as tabelas e os scripts de inserção de dados (inserts).</p>
<p>Abra o arquivo <code>database.ts</code> localizado na pasta <code>src</code> e encontre a seguinte seção:</p>
<pre><code>const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'atlantis'
});
</code></pre>
<p>Altere o valor da <code>password</code> para a senha do seu MySQL.</p>

<h3>Passo 4: Execute o projeto</h3>
<p>Para iniciar o frontend:</p>
<pre><code>npm run dev</code></pre>
<p>Para iniciar o backend:</p>
<pre><code>npm start</code></pre>
