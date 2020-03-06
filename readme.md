# Frontend Arquivos ADV

### Padronização do GIT:

* *Nenhum commit deve ser feito diretamente na branch develop*

* Todo card no Trello deve tornar-se uma nova branch e então as modificações necessárias serão feitas nesta nova branch
  
*  Assim que finalizada a tarefa descrita no trello o dono da branch deve realizar um *merge request* no GitHub. Qualquer outra pessoa pode fazer o code review, aprovar e mergear a branch à develop (o mesmo vale para reprovação de código e solitação de rework).
  
*  Antes de mudar de branch certifique-se que não tem modificações que precisem ser commitadas. Utilize o comando:

   * ```git status```

* Antes de começar qualquer branch nova deve ser realizado um pull da develop, para garantir que sua branch local não esteja atrás em commits da origin/develop

  * ```git pull```

### Comandos de branch

* Para mudar de branch:

  ```git checkout NOME_DA_BRANCH```

* Para criar uma branch nova:

  ```git checkout -b NOME_DA_BRANCH```


### Comandos de commit

```git add .```

```git commit -m '[NOME_DA_FEATURE] DIGITE_UMA_BREVE_DESCRIÇÃO_AQUI' ```

```git push -u origin NOME_DA_BRANCH ```