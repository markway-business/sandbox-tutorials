# Configuração de Redirecionamento de Portas da Sandbox

A tabela abaixo lista os serviços e as respectivas portas de saída utilizadas no sandbox TDP. Essa configuração permite o acesso aos serviços hospedados na máquina virtual.

| Aplicação | *Porta* |
| --- | --- |
| Ambari | 8080 |
| Apache | 42080 |
| Datanode | 50075 |
| Atlas | 21000 |
| Grafana | 3000 |
| Druid1 | 8888 |
| Druid2 | 8081 |
| HBaseMaster | 16010 |
| HBaseRegion | 16030 |
| HDFS | 8020 |
| HiveJDBCJar | 10002 |
| HostSSH | 2122 |
| HostSSH2 | 2200 |
| JobHistory | 19888 |
| Kafka | 8079 |
| Knox | 8443 |
| NiFi | 9090 |
| NiFi Registry | 61080 |
| NodeManager | 8042 |
| Nodemanager | 8040 |
| ResourceManager (RM) | 8032 |
| Infra Solr | 8886 |
| Solr Admin | 8983 |
| SparkHistoryServer | 18082 |
| WebHBase | 60080 |
| WebHDFS | 50070 |
| Ranger | 6080 |
| YARN | 8088 |
| YarnATS | 8188 |
| Zeppelin | 9995 |
| Superset | 9088 |
| AirflowUI | 18080 |
| CeleryFlowerUI | 5555 |

Utilize essa tabela para configurar e acessar os serviços conforme necessário.

Caso sua máquina já esteja utilizando alguma das portas configuradas para a sandbox, ela não será inicializada, e o VirtualBox apresentará um erro durante o processo, abortando a execução.