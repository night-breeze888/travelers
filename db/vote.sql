/*
Navicat MySQL Data Transfer

Source Server         : my-mysql
Source Server Version : 50643
Source Host           : 47.107.35.17:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-03-07 01:36:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for candidate
-- ----------------------------
DROP TABLE IF EXISTS `candidate`;
CREATE TABLE `candidate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户绑定手机',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间：逻辑删除时使用',
  `avatar` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '头像url',
  `gender` int(11) DEFAULT '0' COMMENT '性别: 0 - 未知 1 - 男 2 - 女',
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注信息',
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '类型: 1-候选人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56427 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='候选人列表';

-- ----------------------------
-- Records of candidate
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '姓名',
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '类型：1 - 工作人员',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间：逻辑删除时使用',
  `last_login` datetime DEFAULT NULL COMMENT '上一次登录时间',
  `last_ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '上一次登录ip',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '账号',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `salt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工作人员表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户绑定手机',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间：逻辑删除时使用',
  `avatar` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '头像url',
  `openid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '第三方openid',
  `unionid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信开放平台id',
  `gender` int(11) DEFAULT '0' COMMENT '性别: 0 - 未知 1 - 男 2 - 女',
  `last_login` datetime DEFAULT NULL COMMENT '上一次登录时间',
  `remark` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注信息',
  `type` int(11) DEFAULT '1' COMMENT '用户来源:1- 邮箱，2 - 手机号',
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '账号',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `salt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56431 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('56430', null, null, '2019-03-07 00:05:51', null, null, '', null, null, '0', null, null, '1', '550541288@qq.com', 'zhangshuai', '$2b$06$0U4KyHY1NhWESfWUsESLDO.jzAPndULNgHbTl4DD5VA8QqhSSxNwi', '$2b$06$0U4KyHY1NhWESfWUsESLDO');

-- ----------------------------
-- Table structure for vote
-- ----------------------------
DROP TABLE IF EXISTS `vote`;
CREATE TABLE `vote` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间：逻辑删除时使用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `candidate_id` int(11) NOT NULL COMMENT '候选人id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='投票记录表';

-- ----------------------------
-- Records of vote
-- ----------------------------
INSERT INTO `vote` VALUES ('470', '2018-12-27 16:47:23', null, null, null, '0', '0');
INSERT INTO `vote` VALUES ('471', '2019-01-10 14:33:01', '2019-01-11 09:32:52', null, null, '0', '0');
INSERT INTO `vote` VALUES ('473', '2019-02-22 16:19:51', null, null, null, '0', '0');
INSERT INTO `vote` VALUES ('474', '2019-03-06 15:33:19', null, null, null, '0', '0');

-- ----------------------------
-- Table structure for vote_time
-- ----------------------------
DROP TABLE IF EXISTS `vote_time`;
CREATE TABLE `vote_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sysuser_id` int(11) NOT NULL COMMENT '工作人员id',
  `title` varchar(150) DEFAULT NULL COMMENT '时间标题',
  `start_time` datetime DEFAULT NULL COMMENT '投票开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '投票结束时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COMMENT='投票时间配置表';

-- ----------------------------
-- Records of vote_time
-- ----------------------------
INSERT INTO `vote_time` VALUES ('36', '1', '测试活动', '2017-05-17 17:20:10', '2017-05-18 23:59:59', '2017-05-17 17:20:20', '2017-05-18 16:54:07', null);
INSERT INTO `vote_time` VALUES ('37', '1', 'Stephen21', '2017-04-17 00:00:00', '2017-05-17 23:59:59', '2017-05-17 17:21:40', '2017-05-17 19:00:20', null);
INSERT INTO `vote_time` VALUES ('38', '1', '测试活动001', '2017-05-16 17:22:06', '2017-05-17 08:00:00', '2017-05-17 17:22:58', '2017-05-17 17:25:47', null);
INSERT INTO `vote_time` VALUES ('39', '1', 'stephen21', '2017-05-18 19:00:49', '2017-05-19 23:59:59', '2017-05-17 19:01:29', '2017-05-17 19:02:07', null);
INSERT INTO `vote_time` VALUES ('40', '1', 'Stephen22', '2017-04-18 00:00:00', '2017-05-18 23:59:59', '2017-05-18 10:49:24', '2017-05-18 11:34:23', null);
INSERT INTO `vote_time` VALUES ('41', '1', '这是一条测试数据', '2017-04-01 00:00:00', '2017-04-02 23:59:59', '2017-05-18 11:47:59', null, null);
INSERT INTO `vote_time` VALUES ('42', '1', '活动', '2017-05-18 00:00:00', '2017-05-18 23:59:59', '2017-05-18 15:36:37', null, null);
INSERT INTO `vote_time` VALUES ('43', '1', '778', '2017-05-09 00:00:00', '2017-05-19 23:59:59', '2017-05-18 15:37:23', null, null);
INSERT INTO `vote_time` VALUES ('44', '1', '测试活动001', '2017-05-14 00:00:00', '2017-05-18 23:59:59', '2017-05-18 15:43:01', null, null);
INSERT INTO `vote_time` VALUES ('45', '1', '测试活动002', '2017-06-01 00:00:00', '2017-06-02 23:59:59', '2017-05-18 15:46:02', null, null);
INSERT INTO `vote_time` VALUES ('46', '1', '测试活动', '2017-05-19 11:46:55', '2017-05-19 23:59:59', '2017-05-19 11:46:55', '2017-05-19 11:52:29', null);
INSERT INTO `vote_time` VALUES ('47', '1', '测试001', '2017-06-18 00:00:00', '2017-06-22 23:59:59', '2017-06-23 11:39:15', '2017-06-23 11:39:26', null);
INSERT INTO `vote_time` VALUES ('48', '1', '活动测试', '2017-06-24 00:00:00', '2017-06-27 23:59:59', '2017-06-27 16:42:49', null, null);
INSERT INTO `vote_time` VALUES ('49', '1', 'dffd', '2017-06-24 00:00:00', '2017-06-30 23:59:59', '2017-06-27 16:43:23', null, null);
INSERT INTO `vote_time` VALUES ('50', '1', 'ggf', '2017-06-28 11:38:48', '2017-06-28 11:38:52', '2017-06-28 11:39:00', null, null);
INSERT INTO `vote_time` VALUES ('51', '1', 'gh', '2017-06-28 11:39:44', '2017-06-28 11:39:49', '2017-06-28 11:39:55', null, null);
INSERT INTO `vote_time` VALUES ('52', '1', '测试免费', '2017-06-29 11:42:13', '2017-06-30 11:42:19', '2017-06-28 11:42:30', null, null);
INSERT INTO `vote_time` VALUES ('53', '1', '测试原价', '2017-07-01 11:54:14', '2017-08-23 12:54:22', '2017-06-29 11:54:34', null, '2017-06-29 11:57:00');
INSERT INTO `vote_time` VALUES ('54', '1', '测试', '2017-06-30 12:08:53', '2017-07-05 12:08:58', '2017-06-29 12:09:08', null, '2017-06-29 12:09:20');
INSERT INTO `vote_time` VALUES ('55', '1', '4343', '2017-06-30 12:11:25', '2017-07-06 12:11:29', '2017-06-29 12:12:03', null, '2017-06-29 12:12:07');
INSERT INTO `vote_time` VALUES ('56', '1', '66', '2017-07-29 00:00:00', '2017-07-31 00:00:00', '2017-06-29 12:20:46', null, '2017-06-29 12:21:38');
INSERT INTO `vote_time` VALUES ('57', '1', '测试', '2017-07-01 00:00:00', '2017-06-30 00:00:00', '2017-06-29 17:08:12', null, '2017-06-29 17:09:02');
INSERT INTO `vote_time` VALUES ('58', '1', 're', '2017-07-31 00:00:00', '2017-08-31 00:00:00', '2017-07-11 12:31:17', null, null);
INSERT INTO `vote_time` VALUES ('59', '1', '002', '2017-08-10 00:00:00', '2017-08-10 23:59:59', '2017-08-10 19:00:18', null, null);
INSERT INTO `vote_time` VALUES ('60', '1', '测试', '2017-08-11 00:00:00', '2017-08-13 23:59:59', '2017-08-11 12:39:01', null, null);
INSERT INTO `vote_time` VALUES ('61', '1', 'eee', '2017-11-08 00:00:00', '2017-11-08 23:59:59', '2017-11-08 15:03:46', null, null);
INSERT INTO `vote_time` VALUES ('62', '1', 'uuuuu', '2017-11-29 00:00:00', '2017-11-29 23:59:59', '2017-11-09 17:10:23', null, null);
INSERT INTO `vote_time` VALUES ('63', '1', '请问', '2017-12-12 00:00:00', '2017-12-27 23:59:59', '2017-12-12 11:33:18', null, null);
INSERT INTO `vote_time` VALUES ('64', '1', '充多少送多少', '2017-12-20 00:00:00', '2017-12-21 23:59:59', '2017-12-20 17:58:34', null, null);
INSERT INTO `vote_time` VALUES ('65', '1', '7折', '2017-12-20 00:00:00', '2017-12-21 23:59:59', '2017-12-20 18:51:13', null, null);
INSERT INTO `vote_time` VALUES ('66', '1', 'zcq1', '2017-12-21 00:00:00', '2017-12-25 23:59:59', '2017-12-21 09:17:36', null, null);
INSERT INTO `vote_time` VALUES ('67', '1', 'zcq2', '2017-12-21 00:00:00', '2017-12-25 23:59:59', '2017-12-21 09:17:54', null, null);
INSERT INTO `vote_time` VALUES ('68', '1', 'zcq3', '2017-12-22 00:00:00', '2017-12-23 23:59:59', '2017-12-21 11:15:17', null, '2017-12-21 11:15:30');
INSERT INTO `vote_time` VALUES ('69', '1', 'zcw1', '2017-12-29 00:00:00', '2017-12-30 23:59:59', '2017-12-21 11:16:16', null, '2017-12-21 11:17:28');
INSERT INTO `vote_time` VALUES ('70', '1', '0.9', '2017-12-27 00:00:00', '2017-12-31 23:59:59', '2017-12-21 11:16:51', null, '2017-12-21 11:17:25');
INSERT INTO `vote_time` VALUES ('71', '1', 'ZCQ', '2017-12-21 00:00:00', '2017-12-23 23:59:59', '2017-12-21 11:21:44', null, null);
INSERT INTO `vote_time` VALUES ('72', '1', 'ZCQ1', '2017-12-21 00:00:00', '2017-12-22 23:59:59', '2017-12-21 11:22:57', null, null);
