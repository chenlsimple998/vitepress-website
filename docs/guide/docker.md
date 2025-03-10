Docker 基本操作
获取镜像
可以使用 docker pull 命令从 Docker Hub 或其他镜像仓库中拉取镜像。例如，拉取一个名为 nginx 的镜像：
bash
sudo docker pull nginx
查看镜像列表
使用 docker images 命令查看本地已下载的镜像列表：
bash
sudo docker images
运行容器
使用 docker run 命令创建并启动一个容器。例如，使用刚刚拉取的 nginx 镜像启动一个容器：
bash
sudo docker run -d -p 8080:80 nginx
-d：表示在后台运行容器。
-p 8080:80：表示将容器的 80 端口映射到主机的 8080 端口。
查看容器列表
使用 docker ps 命令查看正在运行的容器列表：
bash
sudo docker ps
如果要查看所有容器（包括已停止的容器），可以使用 docker ps -a 命令。
停止和启动容器
使用 docker stop 命令停止一个正在运行的容器，使用 docker start 命令启动一个已停止的容器。例如，停止一个名为 nginx-container 的容器：
bash
sudo docker stop nginx-container
启动该容器：
bash
sudo docker start nginx-container
删除容器和镜像
使用 docker rm 命令删除一个容器，使用 docker rmi 命令删除一个镜像。例如，删除一个名为 nginx-container 的容器：
bash
sudo docker rm nginx-container
删除一个名为 nginx 的镜像：
bash
sudo docker rmi nginx
1. 创建自定义镜像
可以使用 Dockerfile 来创建自定义的 Docker 镜像。以下是一个简单的 Dockerfile 示例：
Dockerfile
# 使用基础镜像
FROM ubuntu:20.04

# 安装必要的软件包
RUN apt update && apt install -y nginx

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
将上述内容保存为 Dockerfile，然后在该文件所在的目录下执行以下命令来构建镜像：
bash
sudo docker build -t my-nginx .
-t my-nginx：表示为镜像指定一个标签，即镜像的名称。
.：表示使用当前目录下的 Dockerfile 进行构建。