# Sistema para avaliação de disciplinas
Trabalho da disciplina Prática em Desenvolvimento de Software 

## Membros:
> Gabriela Moraes Miserani de Freitas - 2020006566 -> fullstack

> Isabella Vignoli Gonçalves - 2020006655 -> fullstack

> Raissa Miranda Maciel - 2020006965 -> fullstack

> Maria Luiza Leão Silva - 2020100953 -> fullstack

## Escopo
Criar um ambiente para avaliar as matérias ofertadas e os professores do Departamento de Ciencia da Computação(DCC) que as lecionaram em relação a vários atributos interessantes para os alunos no momento da escolha de disciplinas a se cursar no semestre. Este sistema evita a necessidade de procurar por outros estudantes que já cursaram a disciplina ao sumarizar as avaliações em uma só página.

## Principais features
> Página de cadastro/login

> Avaliar uma materia em relação a:
> * nota geral para disciplina (1 a 5 estrelas)
> * esforço extraclasse (pouco/médio/muito)
> * cobrança de presença
> * tipo de avaliação
> * didática/coerência do professor

> Filtrar as materias de acordo com horario/classificação/professor

> Ordenar matérias mais bem avaliadas 

## Tecnologias
> JavaScript

> NodeJS

> React

> MySQL

> Typescript

## Backlog do produto
> Como usuário, eu gostaria de me cadastrar no sistema

> Como usuário, eu gostaria de logar na minha conta

> Como usuário, eu gostaria de visualizar uma página para adicionar uma avaliação de uma disciplina (formulário)

> Como usuário, eu gostaria de avaliar a disciplina em relação à se cobra presença(sim ou não), didatica do professor(ruim, media, boa, otima), provas(fácil, médio, difícil), trabalhos(fácil, médio, difícil), tempo de dedicação extraclasse(pouco, medio, alto), nota geral da disciplina(1 a 5 estrelas)

> Como usuário, eu gostaria de deletar minha avaliação

> Como usuário, eu gostaria de ver a lista das disciplinas disponíveis

> Como usuário, eu gostaria de filtrar as materias por periodo

> Como usuário, eu gostaria de filtrar as materias por professor

> Como usuário, eu gostaria de filtrar as materias por dia e horário

> Como usuário, eu gostaria de ordenar as materias por avaliação

> Como usuário, eu gostaria de visualizar uma página com a visão geral de cada disciplina

> Como usuário, eu gostaria de poder adicionar um comentário ao final da minha avaliação

> Como usuário, eu gostaria de visualizar a resposta mais frequente para cada categoria da avaliação de uma disciplina

> Como usuário, eu gostaria de visualizar uma página com as informações gerais do professor

>  Como usuário, eu gostaria de ter um perfil

> Como usuário, eu gostaria de atualizar meu perfil

## Backlog da próxima sprint
### História #1: Como usuário, eu gostaria de me cadastrar no sistema
>>Tarefas e responsáveis:
>>>Instalar banco de dados e criar primeiras tabelas [Gabriela]
>>
>>>Instalar node.js [Gabriela]
>>
>>>Configurar o mySQL [Gabriela]
>>
>>>Criar e testar uma primeira rota usando o node.js [Maria]
>>
>>>Implementar versão inicial da tela de cadastro [Isabella]
>>
>>>Implementar no backend a lógica de criar uma nova conta [Maria]

### História #2: Como usuário, eu gostaria de logar na minha conta
>>Tarefas e responsáveis:
>>>Implementar versão inicial da tela de login [Raissa]
>>
>>>Implementar no backend a lógica de realizar login [Maria]
>>
>>>Integrar tela de login com a respectiva lógica no backend [Isabella]

### História #3: Como usuário, eu gostaria de ver a lista das disciplinas disponíveis
>>Tarefas e responsáveis:
>>>Implementar versão inicial da tela com as disciplinas disponíveis [Isabella]
>>
>>>Implementar no backend a lógica listagem das matérias [Gabriela]
>>
>>>Integrar tela com as disciplinas disponíveis com a respectiva lógica no backend [Raissa]
  
### História #4: Como usuário, eu gostaria de visualizar uma página com a visão geral de cada disciplina
>>Tarefas e responsáveis:
>>>Implementar versão inicial da tela geral da disciplina [Isabella]
>>
>>>Adicionar ementa, nome do professor, foto do professor, horário e link para página da máteria no DCC [Raissa]
>>
>>>Implementar no backend a lógica listagem das matérias [Maria]
>>
>>>Integrar tela com a respectiva lógica no backend [Isabella]

### História #5: Como usuário, eu gostaria de visualizar uma página para adicionar uma avaliação de uma disciplina 
>>Tarefas e responsáveis:
>>>Implementar versão inicial da tela de adicionar uma nova avaliação [Raissa]
>>
>>>Implementar no backend uma rota para uma página de nova avaliação [Gabriela]
>>
>>>Integrar tela de nova avaliação com a respectiva lógica no backend [Isabella]

### História #6: Como usuário, eu gostaria de avaliar a disciplina em relação à se cobra presença(sim ou não), didatica do professor(ruim, media, boa, otima), provas(fácil, médio, difícil), trabalhos(fácil, médio, difícil), tempo de dedicação extraclasse(pouco, medio, alto), nota geral da disciplina(1 a 5 estralas)
>>Tarefas e responsáveis:
>>>Implementar formulário [Raissa]
>>
>>>Implementar no backend a lógica de preecher o formulario com o backend/banco de dados [Maria]
>>
>>>Implementar a associação do formulario com o backend[Isabella]

### História #7: Como usuário, eu gostaria de visualizar a resposta mais frequente para cada categoria da avaliação de uma disciplina
>>Tarefas e responsáveis:
>>>Implementar na tela da disciplina uma tabela onde as respostas mais frequntes serão mostrados [Raissa]
>>
>>>Implementar no backend a lógica do cálculo para computar a resposta mais frequente [Gabriela]
>>
>>>Integrar a tabela com a respectiva lógica no backend [Isabella]

### História #8: Como usuário, eu gostaria de ordenar as materias por avaliação
>>Tarefas e responsáveis:
>>>Implementar na tela de listagem das disciplinas disponíveis um filtro para ordenação por nota de avaliação [Isabella]
>>
>>>Implementar no backend a lógica de ordenação por nota de avaliação [Maria]
>>
>>>Integrar filtro de ordenação com a respectiva lógica no backend [Raissa]

## Arquitetura Hexagonal

Para estabelecer uma separação clara entre o domínio e o restante do sistema e garantir uma melhor testabilidade o backend foi organizado em subpastas. Assim, foi criada a pasta domain para agrupar todas as classes de domínio, sendo elas: user, subject, teacher e review. Cada uma dessas classes foi desenvolvida dentro de uma pasta que separava a implementação dos controllores, do repository e do service. Dessa forma, a estrutura final do workspace com a arquitetura hexagonal implementada ficou da seguinte maneira:

>domain
>>review
>>>controllers

>>>repositories

>>>services

>>subject
>>>controllers

>>>repositories

>>>services

>>teacher
>>>controllers

>>>repositories

>>>services

>>user
>>>controllers

>>>repositories

>>>services

