CI（持续集成）和CD（持续交付）是一种自动构建和部署代码的方法。
CI是将代码持续集成到存储库的主分支中，并对代码进行自动测试的实践。
CD可让代码达到可交付状态，这样只需单击一个按钮就可以部署这部分代码，或者在持续部署的情况下，如果所有测试都通过，则自动部署代码。
1.安装Docker

使用 su - 切换到 root 用户：你已经尝试并成功切换到了 root 用户，后续操作在 root 权限下进行即可。

yum install -y yum-utils
yum-Config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker compose-plugin

systemctl start docker