# 本地 MySQL（Anaconda 自带脚本）

## 1. 启停

```bash
/opt/anaconda3/bin/mysql.server start
/opt/anaconda3/bin/mysql.server stop
```

## 2. 连接（本地开发）

| 项   | 值                          |
| ---- | --------------------------- |
| 主机 | `127.0.0.1` 或 `localhost` |
| 端口 | `3306`（默认）             |
| 用户 | `root`                      |
| 密码 | `123`                       |

## 3. 命令行示例

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p123
# 或交互输入密码：
mysql -u root -p
```

## 4. 数据库初始化（HIS）

使用 **root** 登录后，将下面整段 SQL 粘贴执行即可（或先保存为 `.sql` 再用 `SOURCE` / 重定向执行）。

```sql
SET NAMES utf8;

CREATE DATABASE IF NOT EXISTS `his` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `his`;

DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `doctype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8;

INSERT INTO `tb_user` (`user_id`, `user_name`, `password`, `email`, `doctype`) VALUES
  (1, '张伟', '123', 'zhang.wei@example.com', '普通'),
  (2, '李娜', '123', 'li.na@example.com', '普通'),
  (3, '王磊', 'Qwerty!2024', 'wang.lei@example.org', '专家'),
  (4, '刘涛', 'Welcome#45', 'liu.tao@company.com', '专家'),
  (5, '陈晨', 'Mys3cureP@ss', 'chen.chen123@gmail.com', '专家');

SET FOREIGN_KEY_CHECKS = 1;
```
