# **Orquestração de Dados na Camada Bronze com NiFi e HDFS (parte 1)**

## Incoming to Processed
Neste tópico, configuraremos um fluxo no NiFi para mover os dados do diretório `incoming` para o diretório `processed` no sistema de arquivos local. Este processo organiza os arquivos por data, garantindo uma estrutura clara para o histórico dos dados. Abaixo é possível verificar a estrutura de diretórios previamente montada no módulo anterior. 

### Processos do Nifi
Utilizaremos os seguintes processadores no Nifi:

```
GetFile -> UpdateAttribute -> PutFile
```

**GetFile**: recupera o arquivo `Product.csv` do diretório `incoming`.
| Configuração | Campo            | Valor                          | Descrição                                               |
|------------------|----------------------|------------------------------------|-------------------------------------------------------------|
| Scheduling   | Run Schedule         | `86400 sec`                          | Equivalente a 1 dia em segundos                             |
| Properties   | Input Directory      | `/home/data/edge/incoming`         | Diretório de entrada para os arquivos                      |
|                  | File Filter          | `.*\.csv$`                         | Recupera todos os arquivos com extensão `.csv`             |
|                  | Keep Source File     | `false`                            | Apaga os arquivos de `incoming` após mover para `processed`|
| Relationships| success              | `retry`                               | Conexão para fluxo em caso de sucesso                      |


**UpdateAttribute**: cria o path do diretório em `processed`.
| Configuração | Campo              | Valor                                      | Descrição                                             |
|------------------|------------------------|----------------------------------------------|-----------------------------------------------------------|
| Properties   | relativePath         | `${absolute.path:substringAfter('data/edge/incoming/')}` | Cria a propriedade `relativePath` com base no caminho absoluto |
|                  | timestamp            | `${now():format('yyyy-MM-dd')}`               | Cria a propriedade `timestamp` com a data atual formatada |
| Relationships| success              | -                                            | Fluxo em caso de sucesso                                  |


**PutFile**: Salva o arquivo no diretório `processed`.
| Configuração | Campo                     | Valor                                         | Descrição                                             |
|------------------|-------------------------------|-------------------------------------------------|-----------------------------------------------------------|
| Properties   | Directory                  | `/home/data/edge/processed/${relativePath}/${timestamp}` | Diretório final para salvar os arquivos                   |
|                  | Conflict Resolution Strategy | `replace`                                       | Substitui o arquivo existente em caso de conflito         |
|                  | Create Missing Directories | `true`                                          | Cria diretórios inexistentes automaticamente             |
| Relationships| success                    | `terminate`                                     | Finaliza o fluxo em caso de sucesso                      |
|                  | failure                    | `terminate`                                     | Finaliza o fluxo em caso de falha                        |


Ao término do processo, o arquivo `Product.csv` será armazenado no diretório:
`/home/data/edge/processed/production/product/{YYYY-MM-DD}`.

Exemplo de resultado:

```
/home/data/edge/processed/
│── production
│   └── product
│       └── 2024-11-20
│           └── Product.csv
```

A próxima seção abordará como enviar os dados de processed para a camada Bronze no HDFS.