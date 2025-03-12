/*
 Navicat MySQL Data Transfer

 Source Server         : MySql
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : sc

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 12/03/2025 10:47:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for habit
-- ----------------------------
DROP TABLE IF EXISTS `habit`;
CREATE TABLE `habit`  (
  `id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '习惯id，自增',
  `userId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '习惯的名称',
  `thumb` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'habit.png' COMMENT '习惯图标',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `beginDate` date NULL DEFAULT NULL COMMENT '开始日期',
  `groupId` bigint NULL DEFAULT NULL COMMENT '习惯分组id',
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '习惯信息更新时间',
  `deleteFlag` tinyint(1) NULL DEFAULT NULL COMMENT '删除标识，0.表示未删除，1.表示删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_userId`(`userId`) USING BTREE,
  INDEX `index_delete_flag`(`deleteFlag`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habit
-- ----------------------------
INSERT INTO `habit` VALUES ('H019324981288', 'U429852656852', 'q', 'habit.png', '2025-02-22 11:24:20', '2025-02-22', 40, '', NULL, 0);
INSERT INTO `habit` VALUES ('H3463919515439', 'U429852656852', '阅读', 'reading.png', '2025-02-22 11:27:16', '2025-02-22', 41, '阅读使人受益', NULL, 0);
INSERT INTO `habit` VALUES ('H36176125942', 'U47811742828165', '起飞式锻炼', 'exercise.png', '2025-01-09 10:34:55', '2025-01-01', 6, '起飞，欸飞~', NULL, 0);
INSERT INTO `habit` VALUES ('H4024690107768', 'U47811742828165', '123', 'habit.png', '2025-01-24 16:16:49', '2025-01-27', 1, '12', '2025-01-28 09:19:07', 0);
INSERT INTO `habit` VALUES ('H52862719885', 'U429852656852', '锻炼', 'exercise.png', '2025-02-22 11:26:00', '2025-02-22', 44, '锻炼进行时！', NULL, 0);
INSERT INTO `habit` VALUES ('H568694593215', 'U47811742828165', '快乐cheems', 'fe259405-f999-4237-b2d6-b82caa2b2d56.jpg', '2025-01-17 16:22:55', '2025-01-17', 3, '快乐cheems，happy every day！', '2025-01-17 16:52:21', 0);
INSERT INTO `habit` VALUES ('H5791865054', 'U47811742828165', '阅读', 'reading.png', '2025-01-09 10:54:47', '2025-01-01', 2, '阅读使人受益', '2025-01-11 15:12:18', 0);
INSERT INTO `habit` VALUES ('H612712257344', 'U47811742828165', '12', 'habit.png', '2025-01-09 10:26:48', '2025-01-01', 2, '飞', '2025-02-13 11:41:54', 0);
INSERT INTO `habit` VALUES ('H62102726390', 'U429852656852', 'qqqqqq', 'habit.png', '2025-03-11 23:23:56', '2025-03-11', 41, '', NULL, 0);

-- ----------------------------
-- Table structure for habitfrequency
-- ----------------------------
DROP TABLE IF EXISTS `habitfrequency`;
CREATE TABLE `habitfrequency`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id主键，自增',
  `habitId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '习惯id',
  `days` json NULL COMMENT '频率每周的日子，周一，周二等执行',
  `weekPersistDays` int NULL DEFAULT NULL COMMENT '每周多少天，最大值7',
  `period` int NULL DEFAULT NULL COMMENT '每隔多少天',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_habit_id`(`habitId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitfrequency
-- ----------------------------
INSERT INTO `habitfrequency` VALUES (1, 'H612712257344', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (2, 'H36176125942', NULL, NULL, 3, NULL);
INSERT INTO `habitfrequency` VALUES (3, 'H5791865054', NULL, 4, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (28, 'H568694593215', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (31, 'H4024690107768', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (34, 'H019324981288', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (35, 'H52862719885', NULL, NULL, 3, NULL);
INSERT INTO `habitfrequency` VALUES (36, 'H3463919515439', NULL, 4, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (37, 'H62102726390', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for habitgroup
-- ----------------------------
DROP TABLE IF EXISTS `habitgroup`;
CREATE TABLE `habitgroup`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分组id,自增',
  `userId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户id',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分组名称',
  `code` int NULL DEFAULT NULL COMMENT '分组编号值',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `index_habitId_code`(`userId`, `code`) USING BTREE,
  INDEX `index_user_id`(`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitgroup
-- ----------------------------
INSERT INTO `habitgroup` VALUES (1, 'U47811742828165', '早晨', 1, NULL);
INSERT INTO `habitgroup` VALUES (2, 'U47811742828165', '上午', 2, NULL);
INSERT INTO `habitgroup` VALUES (3, 'U47811742828165', '中午', 3, NULL);
INSERT INTO `habitgroup` VALUES (4, 'U47811742828165', '下午', 4, NULL);
INSERT INTO `habitgroup` VALUES (5, 'U47811742828165', '晚上', 5, NULL);
INSERT INTO `habitgroup` VALUES (6, 'U47811742828165', '其他', 6, NULL);
INSERT INTO `habitgroup` VALUES (13, 'U47811742828165', '起飞', 7, NULL);
INSERT INTO `habitgroup` VALUES (15, 'U47811742828165', '起大飞', 8, NULL);
INSERT INTO `habitgroup` VALUES (40, 'U429852656852', '早晨', 1, NULL);
INSERT INTO `habitgroup` VALUES (41, 'U429852656852', '上午', 2, NULL);
INSERT INTO `habitgroup` VALUES (42, 'U429852656852', '中午', 3, NULL);
INSERT INTO `habitgroup` VALUES (43, 'U429852656852', '下午', 4, NULL);
INSERT INTO `habitgroup` VALUES (44, 'U429852656852', '晚上', 5, NULL);
INSERT INTO `habitgroup` VALUES (45, 'U429852656852', '其他', 6, NULL);

-- ----------------------------
-- Table structure for habitoption
-- ----------------------------
DROP TABLE IF EXISTS `habitoption`;
CREATE TABLE `habitoption`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '习惯选项信息id',
  `habitId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '习惯id',
  `aimDays` int NULL DEFAULT NULL COMMENT '坚持的目标天数,-1代表一直要坚持',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `persistDays` int UNSIGNED NULL DEFAULT NULL COMMENT '习惯坚持完成的天数',
  `continuousDays` int NULL DEFAULT NULL COMMENT '连续完成天数',
  `mostDays` int NULL DEFAULT NULL COMMENT '最多坚持天数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_habit_id`(`habitId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitoption
-- ----------------------------
INSERT INTO `habitoption` VALUES (1, 'H612712257344', 100, NULL, 4, 1, 4);
INSERT INTO `habitoption` VALUES (2, 'H36176125942', -1, NULL, 1, 1, 1);
INSERT INTO `habitoption` VALUES (3, 'H5791865054', 30, NULL, 8, 0, 8);
INSERT INTO `habitoption` VALUES (26, 'H0963540585', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (27, 'H773687026891', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (28, 'H568694593215', -1, NULL, 2, 1, 1);
INSERT INTO `habitoption` VALUES (31, 'H4024690107768', -1, NULL, 2, 1, 1);
INSERT INTO `habitoption` VALUES (34, 'H019324981288', -1, NULL, 1, 0, 1);
INSERT INTO `habitoption` VALUES (35, 'H52862719885', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (36, 'H3463919515439', -1, NULL, 3, 0, 4);
INSERT INTO `habitoption` VALUES (37, 'H62102726390', -1, NULL, 1, 0, 0);

-- ----------------------------
-- Table structure for habitrecord
-- ----------------------------
DROP TABLE IF EXISTS `habitrecord`;
CREATE TABLE `habitrecord`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '习惯完成记录id',
  `finishTime` datetime NULL DEFAULT NULL COMMENT '每次打卡的时间',
  `habitId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '习惯id',
  `finished` tinyint(1) NULL DEFAULT NULL COMMENT '是否完成',
  `day` date NULL DEFAULT NULL COMMENT '习惯重复时的那一天的日期',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_time`(`finishTime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 149 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitrecord
-- ----------------------------
INSERT INTO `habitrecord` VALUES (1, NULL, 'H4024690107768', 0, '2025-01-25', NULL);
INSERT INTO `habitrecord` VALUES (2, NULL, 'H568694593215', 0, '2025-01-25', NULL);
INSERT INTO `habitrecord` VALUES (3, NULL, 'H5791865054', 0, '2025-01-25', NULL);
INSERT INTO `habitrecord` VALUES (4, NULL, 'H612712257344', 0, '2025-01-25', NULL);
INSERT INTO `habitrecord` VALUES (5, NULL, 'H36176125942', 0, '2025-01-25', NULL);
INSERT INTO `habitrecord` VALUES (6, NULL, 'H4024690107768', 0, '2025-01-26', NULL);
INSERT INTO `habitrecord` VALUES (7, NULL, 'H568694593215', 0, '2025-01-26', NULL);
INSERT INTO `habitrecord` VALUES (8, NULL, 'H5791865054', 0, '2025-01-26', NULL);
INSERT INTO `habitrecord` VALUES (9, NULL, 'H612712257344', 0, '2025-01-26', NULL);
INSERT INTO `habitrecord` VALUES (10, NULL, 'H4024690107768', 0, '2025-01-27', '2025-01-27 10:55:11');
INSERT INTO `habitrecord` VALUES (11, NULL, 'H568694593215', 0, '2025-01-27', NULL);
INSERT INTO `habitrecord` VALUES (12, NULL, 'H5791865054', 0, '2025-01-27', NULL);
INSERT INTO `habitrecord` VALUES (13, NULL, 'H612712257344', 0, '2025-01-27', NULL);
INSERT INTO `habitrecord` VALUES (15, NULL, 'H36176125942', 0, '2025-01-28', NULL);
INSERT INTO `habitrecord` VALUES (16, NULL, 'H4024690107768', 0, '2025-01-28', '2025-01-28 09:27:02');
INSERT INTO `habitrecord` VALUES (17, NULL, 'H568694593215', 0, '2025-01-28', NULL);
INSERT INTO `habitrecord` VALUES (18, NULL, 'H5791865054', 0, '2025-01-28', NULL);
INSERT INTO `habitrecord` VALUES (19, NULL, 'H612712257344', 0, '2025-01-28', NULL);
INSERT INTO `habitrecord` VALUES (20, NULL, 'H4024690107768', 0, '2025-01-29', NULL);
INSERT INTO `habitrecord` VALUES (21, NULL, 'H568694593215', 0, '2025-01-29', NULL);
INSERT INTO `habitrecord` VALUES (22, NULL, 'H5791865054', 0, '2025-01-29', NULL);
INSERT INTO `habitrecord` VALUES (23, NULL, 'H612712257344', 0, '2025-01-29', NULL);
INSERT INTO `habitrecord` VALUES (24, NULL, 'H36176125942', 0, '2025-01-31', NULL);
INSERT INTO `habitrecord` VALUES (25, NULL, 'H4024690107768', 0, '2025-01-31', NULL);
INSERT INTO `habitrecord` VALUES (26, NULL, 'H568694593215', 0, '2025-01-31', NULL);
INSERT INTO `habitrecord` VALUES (27, NULL, 'H612712257344', 0, '2025-01-31', NULL);
INSERT INTO `habitrecord` VALUES (28, NULL, 'H4024690107768', 0, '2025-01-30', NULL);
INSERT INTO `habitrecord` VALUES (29, NULL, 'H568694593215', 0, '2025-01-30', NULL);
INSERT INTO `habitrecord` VALUES (30, NULL, 'H5791865054', 0, '2025-01-30', NULL);
INSERT INTO `habitrecord` VALUES (31, NULL, 'H612712257344', 0, '2025-01-30', NULL);
INSERT INTO `habitrecord` VALUES (35, NULL, 'H4024690107768', 0, '2025-02-01', NULL);
INSERT INTO `habitrecord` VALUES (36, NULL, 'H568694593215', 0, '2025-02-01', NULL);
INSERT INTO `habitrecord` VALUES (37, NULL, 'H612712257344', 0, '2025-02-01', NULL);
INSERT INTO `habitrecord` VALUES (38, NULL, 'H36176125942', 0, '2025-02-03', NULL);
INSERT INTO `habitrecord` VALUES (39, NULL, 'H4024690107768', 0, '2025-02-03', NULL);
INSERT INTO `habitrecord` VALUES (40, NULL, 'H568694593215', 0, '2025-02-03', NULL);
INSERT INTO `habitrecord` VALUES (41, NULL, 'H612712257344', 0, '2025-02-03', NULL);
INSERT INTO `habitrecord` VALUES (42, NULL, 'H36176125942', 0, '2025-02-06', NULL);
INSERT INTO `habitrecord` VALUES (43, NULL, 'H4024690107768', 0, '2025-02-06', NULL);
INSERT INTO `habitrecord` VALUES (44, NULL, 'H568694593215', 0, '2025-02-06', NULL);
INSERT INTO `habitrecord` VALUES (45, NULL, 'H612712257344', 0, '2025-02-06', NULL);
INSERT INTO `habitrecord` VALUES (46, NULL, 'H4024690107768', 0, '2025-02-07', NULL);
INSERT INTO `habitrecord` VALUES (47, NULL, 'H568694593215', 0, '2025-02-07', NULL);
INSERT INTO `habitrecord` VALUES (48, NULL, 'H612712257344', 0, '2025-02-07', NULL);
INSERT INTO `habitrecord` VALUES (52, NULL, 'H4024690107768', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (53, NULL, 'H568694593215', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (54, NULL, 'H612712257344', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (58, NULL, 'H4024690107768', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (59, NULL, 'H568694593215', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (60, NULL, 'H612712257344', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (61, NULL, 'H36176125942', 0, '2025-02-12', NULL);
INSERT INTO `habitrecord` VALUES (62, NULL, 'H4024690107768', 0, '2025-02-12', NULL);
INSERT INTO `habitrecord` VALUES (63, NULL, 'H568694593215', 0, '2025-02-12', NULL);
INSERT INTO `habitrecord` VALUES (64, '2025-02-14 22:30:06', 'H612712257344', 1, '2025-02-12', '2025-02-14 22:30:06');
INSERT INTO `habitrecord` VALUES (65, NULL, 'H612712257344', 0, '2025-02-13', '2025-02-15 09:35:39');
INSERT INTO `habitrecord` VALUES (66, NULL, 'H568694593215', 0, '2025-02-13', NULL);
INSERT INTO `habitrecord` VALUES (67, NULL, 'H4024690107768', 0, '2025-02-13', NULL);
INSERT INTO `habitrecord` VALUES (70, NULL, 'H36176125942', 0, '2025-02-09', NULL);
INSERT INTO `habitrecord` VALUES (71, NULL, 'H4024690107768', 0, '2025-02-09', NULL);
INSERT INTO `habitrecord` VALUES (72, NULL, 'H568694593215', 0, '2025-02-09', NULL);
INSERT INTO `habitrecord` VALUES (73, NULL, 'H612712257344', 0, '2025-02-09', NULL);
INSERT INTO `habitrecord` VALUES (75, NULL, 'H4024690107768', 0, '2025-02-14', NULL);
INSERT INTO `habitrecord` VALUES (76, NULL, 'H568694593215', 0, '2025-02-14', NULL);
INSERT INTO `habitrecord` VALUES (77, '2025-02-15 09:35:35', 'H612712257344', 1, '2025-02-14', '2025-02-15 09:35:34');
INSERT INTO `habitrecord` VALUES (79, NULL, 'H36176125942', 0, '2025-02-15', NULL);
INSERT INTO `habitrecord` VALUES (80, '2025-02-15 10:47:20', 'H4024690107768', 1, '2025-02-15', '2025-02-15 10:47:20');
INSERT INTO `habitrecord` VALUES (81, '2025-02-15 10:40:33', 'H568694593215', 1, '2025-02-15', '2025-02-15 10:40:32');
INSERT INTO `habitrecord` VALUES (82, '2025-02-15 09:35:32', 'H612712257344', 1, '2025-02-15', '2025-02-15 09:35:32');
INSERT INTO `habitrecord` VALUES (88, NULL, 'H4024690107768', 0, '2025-02-16', NULL);
INSERT INTO `habitrecord` VALUES (89, NULL, 'H568694593215', 0, '2025-02-16', NULL);
INSERT INTO `habitrecord` VALUES (90, NULL, 'H612712257344', 0, '2025-02-16', NULL);
INSERT INTO `habitrecord` VALUES (92, NULL, 'H4024690107768', 0, '2025-02-17', NULL);
INSERT INTO `habitrecord` VALUES (93, NULL, 'H568694593215', 0, '2025-02-17', NULL);
INSERT INTO `habitrecord` VALUES (94, NULL, 'H612712257344', 0, '2025-02-17', NULL);
INSERT INTO `habitrecord` VALUES (95, NULL, 'H36176125942', 0, '2025-02-18', NULL);
INSERT INTO `habitrecord` VALUES (96, NULL, 'H4024690107768', 0, '2025-02-18', NULL);
INSERT INTO `habitrecord` VALUES (97, NULL, 'H568694593215', 0, '2025-02-18', NULL);
INSERT INTO `habitrecord` VALUES (98, NULL, 'H612712257344', 0, '2025-02-18', NULL);
INSERT INTO `habitrecord` VALUES (99, NULL, 'H4024690107768', 0, '2025-02-19', NULL);
INSERT INTO `habitrecord` VALUES (100, NULL, 'H568694593215', 0, '2025-02-19', NULL);
INSERT INTO `habitrecord` VALUES (101, NULL, 'H612712257344', 0, '2025-02-19', NULL);
INSERT INTO `habitrecord` VALUES (104, NULL, 'H4024690107768', 0, '2025-02-20', NULL);
INSERT INTO `habitrecord` VALUES (105, NULL, 'H568694593215', 0, '2025-02-20', NULL);
INSERT INTO `habitrecord` VALUES (106, NULL, 'H612712257344', 0, '2025-02-20', NULL);
INSERT INTO `habitrecord` VALUES (108, NULL, 'H36176125942', 0, '2025-02-21', NULL);
INSERT INTO `habitrecord` VALUES (109, NULL, 'H4024690107768', 0, '2025-02-21', NULL);
INSERT INTO `habitrecord` VALUES (110, NULL, 'H568694593215', 0, '2025-02-21', NULL);
INSERT INTO `habitrecord` VALUES (111, NULL, 'H612712257344', 0, '2025-02-21', NULL);
INSERT INTO `habitrecord` VALUES (114, NULL, 'H4024690107768', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (115, NULL, 'H568694593215', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (116, NULL, 'H612712257344', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (117, NULL, 'H019324981288', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (118, NULL, 'H52862719885', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (119, NULL, 'H3463919515439', 0, '2025-02-22', NULL);
INSERT INTO `habitrecord` VALUES (120, NULL, 'H019324981288', 0, '2025-02-26', NULL);
INSERT INTO `habitrecord` VALUES (121, NULL, 'H3463919515439', 0, '2025-02-26', NULL);
INSERT INTO `habitrecord` VALUES (122, NULL, 'H4024690107768', 0, '2025-02-26', NULL);
INSERT INTO `habitrecord` VALUES (123, NULL, 'H568694593215', 0, '2025-02-26', NULL);
INSERT INTO `habitrecord` VALUES (124, NULL, 'H612712257344', 0, '2025-02-26', NULL);
INSERT INTO `habitrecord` VALUES (125, NULL, 'H36176125942', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (126, NULL, 'H4024690107768', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (127, NULL, 'H568694593215', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (128, NULL, 'H612712257344', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (129, NULL, 'H019324981288', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (130, NULL, 'H3463919515439', 0, '2025-02-27', NULL);
INSERT INTO `habitrecord` VALUES (131, NULL, 'H4024690107768', 0, '2025-02-28', NULL);
INSERT INTO `habitrecord` VALUES (132, NULL, 'H568694593215', 0, '2025-02-28', NULL);
INSERT INTO `habitrecord` VALUES (133, NULL, 'H612712257344', 0, '2025-02-28', NULL);
INSERT INTO `habitrecord` VALUES (134, '2025-03-11 23:00:11', 'H36176125942', 1, '2025-03-11', '2025-03-11 23:00:11');
INSERT INTO `habitrecord` VALUES (135, '2025-03-11 23:06:21', 'H4024690107768', 1, '2025-03-11', '2025-03-11 23:06:22');
INSERT INTO `habitrecord` VALUES (136, '2025-03-11 23:06:29', 'H568694593215', 1, '2025-03-11', '2025-03-11 23:06:29');
INSERT INTO `habitrecord` VALUES (137, '2025-03-11 23:06:31', 'H612712257344', 1, '2025-03-11', '2025-03-11 23:06:32');
INSERT INTO `habitrecord` VALUES (138, '2025-03-11 23:22:24', 'H019324981288', 1, '2025-03-11', '2025-03-11 23:22:25');
INSERT INTO `habitrecord` VALUES (142, NULL, 'H019324981288', 0, '2025-03-10', NULL);
INSERT INTO `habitrecord` VALUES (143, '2025-03-12 10:35:23', 'H62102726390', 1, '2025-03-11', '2025-03-12 10:35:22');
INSERT INTO `habitrecord` VALUES (144, NULL, 'H019324981288', 0, '2025-03-12', NULL);
INSERT INTO `habitrecord` VALUES (145, NULL, 'H52862719885', 0, '2025-03-12', NULL);
INSERT INTO `habitrecord` VALUES (146, NULL, 'H62102726390', 0, '2025-03-12', NULL);
INSERT INTO `habitrecord` VALUES (147, NULL, 'H019324981288', 0, '2025-03-09', NULL);
INSERT INTO `habitrecord` VALUES (148, NULL, 'H52862719885', 0, '2025-03-09', NULL);
INSERT INTO `habitrecord` VALUES (149, '2025-03-12 09:46:39', 'H3463919515439', 1, '2025-03-11', '2025-03-12 09:46:39');
INSERT INTO `habitrecord` VALUES (150, '2025-03-12 10:15:53', 'H3463919515439', 1, '2025-03-12', '2025-03-12 10:15:53');
INSERT INTO `habitrecord` VALUES (151, '2025-03-12 09:57:49', 'H3463919515439', 1, '2025-03-10', '2025-03-12 09:57:49');
INSERT INTO `habitrecord` VALUES (152, NULL, 'H3463919515439', 0, '2025-03-13', '2025-03-12 09:58:06');
INSERT INTO `habitrecord` VALUES (153, NULL, 'H3463919515439', 0, '2025-03-14', '2025-03-12 10:16:19');

-- ----------------------------
-- Table structure for habitreminder
-- ----------------------------
DROP TABLE IF EXISTS `habitreminder`;
CREATE TABLE `habitreminder`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '习惯提醒id，自增',
  `habitId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '习惯id',
  `time` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '提醒的时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_habit_id`(`habitId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitreminder
-- ----------------------------
INSERT INTO `habitreminder` VALUES (5, 'H568694593215', '16:04', NULL);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id,自增',
  `userId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户id',
  `createTime` datetime NULL DEFAULT NULL COMMENT '任务创建时间',
  `beginTime` datetime NULL DEFAULT NULL COMMENT '任务开始的时间',
  `endTime` datetime NULL DEFAULT NULL COMMENT '任务结束时间',
  `description` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务信息描述',
  `priority` tinyint(1) NULL DEFAULT NULL COMMENT '任务优先级，1.重要且紧急，2.重要不紧急，3.不重要但是紧急，4.不重要也不紧急',
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务标题',
  `state` tinyint(1) NULL DEFAULT NULL COMMENT '完成状态，1.完成，2.未完成，3.已取消，4.已搁置',
  `repeatable` tinyint(1) NULL DEFAULT NULL COMMENT '是否属于可重复任务',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '任务信息更新时间',
  `finishTime` datetime NULL DEFAULT NULL COMMENT '任务完成时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_begin_time`(`beginTime`) USING BTREE,
  INDEX `index_end_time`(`endTime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, 'U47811742828165', '2025-01-23 16:51:00', '2025-01-23 16:32:00', '2025-01-25 17:32:00', '1', 4, '1', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (2, 'U47811742828165', '2025-01-26 21:57:44', '2025-01-27 21:57:00', '2025-01-27 22:57:00', '1', 4, '1', 4, 0, '2025-01-28 10:18:09', NULL);
INSERT INTO `task` VALUES (3, 'U47811742828165', '2025-01-26 22:02:10', '2025-01-27 22:02:00', '2025-01-27 23:02:00', '2', 4, '2', 4, 0, '2025-01-28 10:18:09', NULL);
INSERT INTO `task` VALUES (4, 'U47811742828165', '2025-01-27 15:30:44', '2025-01-27 15:30:00', '2025-01-27 16:30:00', '23', 4, '23', 4, 0, '2025-01-28 10:18:09', NULL);
INSERT INTO `task` VALUES (5, 'U47811742828165', '2025-01-27 15:40:43', '2025-01-27 15:40:00', '2025-01-27 16:40:00', '45', 4, '32', 4, 0, '2025-01-28 10:18:09', NULL);
INSERT INTO `task` VALUES (6, 'U47811742828165', '2025-01-27 15:59:38', '2025-01-27 16:32:00', '2025-01-27 17:32:00', 'q2', 4, '无标题', 4, 0, '2025-01-28 10:18:09', NULL);
INSERT INTO `task` VALUES (8, 'U47811742828165', '2025-01-31 20:43:47', '2025-01-31 20:43:00', '2025-01-31 21:43:00', '12', 4, '12', 4, 0, '2025-02-01 14:57:56', NULL);
INSERT INTO `task` VALUES (10, 'U47811742828165', '2025-02-06 12:35:42', '2025-02-06 12:35:00', '2025-02-06 13:35:00', '1', 4, '1', 1, 0, '2025-02-06 12:46:40', '2025-02-06 13:00:00');
INSERT INTO `task` VALUES (12, 'U47811742828165', '2025-02-07 10:45:36', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '2', 4, '2', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (13, 'U47811742828165', '2025-02-07 10:45:43', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '3', 4, '3', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (14, 'U47811742828165', '2025-02-07 10:45:46', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '4', 4, '4', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (15, 'U47811742828165', '2025-02-07 10:45:50', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '5', 4, '5', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (16, 'U47811742828165', '2025-02-07 10:45:55', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '6', 4, '6', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (17, 'U47811742828165', '2025-02-10 10:14:31', '2025-02-10 10:13:07', '2025-02-10 11:13:07', '1', 4, '1', 4, 1, '2025-02-11 16:57:33', NULL);
INSERT INTO `task` VALUES (18, 'U47811742828165', '2025-02-10 10:30:47', '2025-02-11 10:13:07', '2025-02-11 11:13:07', '1', 4, '1', 4, 1, '2025-02-12 09:30:42', NULL);
INSERT INTO `task` VALUES (19, 'U47811742828165', '2025-02-12 09:30:43', '2025-02-12 10:13:07', '2025-02-12 11:13:07', '1', 4, '1', 4, 1, '2025-02-13 09:40:30', NULL);
INSERT INTO `task` VALUES (22, 'U47811742828165', '2025-02-12 09:48:38', '2025-02-13 10:13:07', '2025-02-13 11:13:07', '1', 4, '1', 4, 1, '2025-02-14 11:21:30', NULL);
INSERT INTO `task` VALUES (24, 'U47811742828165', '2025-02-14 11:21:30', '2025-02-14 10:13:07', '2025-02-14 11:13:07', '1', 4, '1', 4, 1, '2025-02-14 11:35:11', NULL);
INSERT INTO `task` VALUES (25, 'U47811742828165', '2025-02-14 14:13:31', '2025-02-14 14:59:00', '2025-02-14 15:13:00', '2', 4, '2', 1, 0, '2025-02-14 14:59:04', '2025-02-14 14:59:05');
INSERT INTO `task` VALUES (26, 'U47811742828165', '2025-02-14 22:13:53', '2025-02-15 10:13:07', '2025-02-15 11:13:07', '1', 4, '1', 4, 1, '2025-02-16 20:48:56', NULL);
INSERT INTO `task` VALUES (27, 'U47811742828165', '2025-02-15 16:01:58', '2025-02-15 16:01:00', '2025-02-15 17:01:00', '1', 4, '12', 4, 0, '2025-02-16 20:48:56', NULL);
INSERT INTO `task` VALUES (28, 'U47811742828165', '2025-02-16 20:48:56', '2025-02-16 10:13:07', '2025-02-16 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (29, 'U47811742828165', '2025-02-16 20:51:47', '2025-02-16 20:51:00', '2025-02-16 21:51:00', '1', 4, '1', 4, 0, '2025-02-17 16:30:17', NULL);
INSERT INTO `task` VALUES (34, 'U47811742828165', '2025-02-17 17:00:34', '2025-02-17 17:00:00', '2025-02-17 18:00:00', '1', 4, '1', 4, 0, '2025-02-18 09:59:18', NULL);
INSERT INTO `task` VALUES (42, 'U47811742828165', '2025-02-18 11:26:54', '2025-02-18 11:26:00', '2025-02-18 12:26:00', '32', 4, '12', 4, 0, '2025-02-19 08:42:52', NULL);
INSERT INTO `task` VALUES (45, 'U47811742828165', '2025-02-18 16:11:48', '2025-02-18 16:11:00', '2025-02-18 17:11:00', '12', 4, '12', 4, 0, '2025-02-19 08:42:52', NULL);
INSERT INTO `task` VALUES (46, 'U47811742828165', '2025-02-18 16:12:37', '2025-02-18 16:11:00', '2025-02-18 17:11:00', '12', 4, '12', 4, 0, '2025-02-19 08:42:52', NULL);
INSERT INTO `task` VALUES (47, 'U47811742828165', '2025-02-18 16:30:44', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (48, 'U47811742828165', '2025-02-18 16:30:51', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (49, 'U47811742828165', '2025-02-18 16:31:11', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (50, 'U47811742828165', '2025-02-18 16:32:20', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (51, 'U47811742828165', '2025-02-18 16:34:56', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (52, 'U47811742828165', '2025-02-18 16:41:55', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (53, 'U47811742828165', '2025-02-18 16:50:45', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (54, 'U47811742828165', '2025-02-18 16:50:45', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (55, 'U47811742828165', '2025-02-18 16:50:45', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (56, 'U47811742828165', '2025-02-18 16:50:45', '2025-02-18 10:13:07', '2025-02-18 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (57, 'U47811742828165', '2025-02-19 08:50:29', '2025-02-19 08:50:00', '2025-02-19 09:50:00', '21', 4, '12', 4, 0, '2025-02-20 09:53:41', NULL);
INSERT INTO `task` VALUES (60, 'U47811742828165', '2025-02-19 09:08:52', '2025-02-19 09:08:00', '2025-02-19 10:08:00', '1', 4, '1', 4, 0, '2025-02-20 09:53:41', NULL);
INSERT INTO `task` VALUES (61, 'U47811742828165', '2025-02-19 09:11:46', '2025-02-19 10:13:07', '2025-02-19 11:13:07', '1', 4, '1', 4, 1, '2025-02-20 09:53:41', NULL);
INSERT INTO `task` VALUES (62, 'U47811742828165', '2025-02-19 09:45:25', '2025-02-20 10:13:07', '2025-02-20 11:13:07', '112', 4, '121', 4, 1, '2025-02-21 09:08:55', NULL);
INSERT INTO `task` VALUES (65, 'U47811742828165', '2025-02-20 11:00:47', '2025-02-20 10:54:08', '2025-02-20 11:54:08', '122', 4, '11', 3, 0, '2025-02-20 11:08:28', NULL);
INSERT INTO `task` VALUES (84, 'U47811742828165', '2025-02-20 12:03:31', '2025-02-20 12:03:00', '2025-02-20 13:03:00', '21', 4, '1', 4, 0, '2025-02-21 09:08:55', NULL);
INSERT INTO `task` VALUES (86, 'U47811742828165', '2025-02-21 09:08:56', '2025-02-21 10:13:07', '2025-02-21 11:13:07', '1', 4, '1', 4, 1, '2025-02-22 11:11:21', NULL);
INSERT INTO `task` VALUES (98, 'U47811742828165', '2025-02-22 11:11:21', '2025-02-22 10:13:07', '2025-02-22 11:13:07', '1', 4, '1', 4, 1, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (99, 'U47811742828165', '2025-02-22 11:16:13', '2025-02-22 11:16:00', '2025-02-22 12:16:00', '1', 4, '1', 4, 0, '2025-02-26 22:19:34', NULL);
INSERT INTO `task` VALUES (100, 'U429852656852', '2025-02-22 11:16:40', '2025-02-22 11:16:00', '2025-02-22 12:16:00', 'w', 4, 'q', 4, 0, '2025-02-26 15:21:15', NULL);
INSERT INTO `task` VALUES (101, 'U47811742828165', '2025-02-26 22:19:34', '2025-02-26 10:13:07', '2025-02-26 11:13:07', '1', 4, '1', 4, 1, '2025-02-26 22:51:45', NULL);
INSERT INTO `task` VALUES (102, 'U47811742828165', '2025-02-27 09:22:26', '2025-02-27 10:13:07', '2025-02-27 11:13:07', '1', 4, '1', 4, 1, '2025-02-28 10:26:11', NULL);
INSERT INTO `task` VALUES (103, 'U47811742828165', '2025-02-27 20:37:26', '2025-02-27 20:18:00', '2025-02-27 21:18:00', '2', 4, '2', 4, 1, '2025-02-28 10:26:11', NULL);
INSERT INTO `task` VALUES (104, 'U47811742828165', '2025-02-27 20:38:30', '2025-02-27 20:18:00', '2025-02-27 21:18:00', '3', 3, '3', 4, 0, '2025-02-28 10:26:11', NULL);
INSERT INTO `task` VALUES (105, 'U47811742828165', '2025-02-27 20:39:11', '2025-02-27 20:18:00', '2025-02-27 21:18:00', '4', 2, '4', 4, 1, '2025-02-28 10:26:11', NULL);
INSERT INTO `task` VALUES (106, 'U47811742828165', '2025-02-28 10:26:11', '2025-02-28 10:13:07', '2025-02-28 11:13:07', '1', 4, '1', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (107, 'U47811742828165', '2025-02-28 10:31:53', '2025-03-01 10:13:07', '2025-03-01 11:13:07', '1', 4, '1', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (108, 'U47811742828165', '2025-02-28 10:31:53', '2025-03-01 20:18:00', '2025-03-01 21:18:00', '2', 4, '2', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (109, 'U47811742828165', '2025-02-28 10:32:34', '2025-03-02 10:33:00', '2025-03-02 11:31:00', '5', 4, '5', 4, 0, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (111, 'U47811742828165', '2025-02-28 11:15:45', '2025-03-05 20:18:00', '2025-03-05 21:18:00', '4', 2, '4', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (112, 'U47811742828165', '2025-02-28 11:15:45', '2025-03-05 10:13:07', '2025-03-05 11:13:07', '1', 4, '1', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (113, 'U47811742828165', '2025-02-28 11:17:33', '2025-03-02 10:13:07', '2025-03-02 11:13:07', '1', 4, '1', 4, 1, '2025-03-11 10:05:03', NULL);
INSERT INTO `task` VALUES (114, 'U47811742828165', '2025-02-28 11:17:37', '2025-02-23 10:13:07', '2025-02-23 11:13:07', '1', 4, '1', 4, 1, NULL, NULL);
INSERT INTO `task` VALUES (115, 'U47811742828165', '2025-03-11 10:05:04', '2025-03-11 10:13:07', '2025-03-11 11:13:07', '1', 4, '1', 1, 1, '2025-03-11 23:08:19', '2025-03-11 23:08:19');

-- ----------------------------
-- Table structure for taskinstance
-- ----------------------------
DROP TABLE IF EXISTS `taskinstance`;
CREATE TABLE `taskinstance`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务实例表id',
  `instanceId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '重复任务下的对应任务id，非重复任务，值与任务id相同',
  `taskId` bigint NULL DEFAULT NULL COMMENT '任务id',
  `flag` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 0 COMMENT '删除标识',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_task_id`(`taskId`) USING BTREE,
  INDEX `index_instance_id`(`instanceId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskinstance
-- ----------------------------
INSERT INTO `taskinstance` VALUES (1, '1', 1, 0, NULL);
INSERT INTO `taskinstance` VALUES (2, '2', 2, 0, NULL);
INSERT INTO `taskinstance` VALUES (3, '3', 3, 0, NULL);
INSERT INTO `taskinstance` VALUES (4, '4', 4, 0, NULL);
INSERT INTO `taskinstance` VALUES (5, '5', 5, 0, NULL);
INSERT INTO `taskinstance` VALUES (6, '6', 6, 0, NULL);
INSERT INTO `taskinstance` VALUES (8, '8', 8, 0, NULL);
INSERT INTO `taskinstance` VALUES (10, '10', 10, 0, NULL);
INSERT INTO `taskinstance` VALUES (12, '12', 12, 0, NULL);
INSERT INTO `taskinstance` VALUES (13, '13', 13, 0, NULL);
INSERT INTO `taskinstance` VALUES (14, '14', 14, 0, NULL);
INSERT INTO `taskinstance` VALUES (15, '15', 15, 0, NULL);
INSERT INTO `taskinstance` VALUES (16, '16', 16, 0, NULL);
INSERT INTO `taskinstance` VALUES (17, '17', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (18, '18', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (19, '19', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (22, '22', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (24, '24', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (25, '25', 25, 0, NULL);
INSERT INTO `taskinstance` VALUES (26, '26', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (27, '27', 27, 0, '2025-02-15 16:27:08');
INSERT INTO `taskinstance` VALUES (28, '28', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (29, '29', 29, 0, NULL);
INSERT INTO `taskinstance` VALUES (34, '34', 34, 0, NULL);
INSERT INTO `taskinstance` VALUES (35, '35', 35, 0, NULL);
INSERT INTO `taskinstance` VALUES (36, '36', 36, 0, NULL);
INSERT INTO `taskinstance` VALUES (37, '37', 37, 0, NULL);
INSERT INTO `taskinstance` VALUES (38, '38', 38, 0, NULL);
INSERT INTO `taskinstance` VALUES (39, '39', 39, 0, NULL);
INSERT INTO `taskinstance` VALUES (40, '40', 40, 0, NULL);
INSERT INTO `taskinstance` VALUES (41, '41', 41, 0, NULL);
INSERT INTO `taskinstance` VALUES (42, '42', 42, 0, NULL);
INSERT INTO `taskinstance` VALUES (43, '43', 43, 0, NULL);
INSERT INTO `taskinstance` VALUES (44, '44', 44, 0, NULL);
INSERT INTO `taskinstance` VALUES (45, '45', 45, 0, NULL);
INSERT INTO `taskinstance` VALUES (46, '46', 46, 0, NULL);
INSERT INTO `taskinstance` VALUES (47, '47', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (48, '48', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (49, '49', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (50, '50', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (51, '51', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (52, '52', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (53, '53', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (54, '54', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (55, '55', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (56, '56', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (57, '57', 57, 0, NULL);
INSERT INTO `taskinstance` VALUES (60, '60', 60, 0, NULL);
INSERT INTO `taskinstance` VALUES (61, '61', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (62, '62', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (65, '65', 65, 0, NULL);
INSERT INTO `taskinstance` VALUES (84, '84', 84, 0, '2025-02-20 15:17:59');
INSERT INTO `taskinstance` VALUES (86, '86', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (98, '98', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (99, '99', 99, 0, NULL);
INSERT INTO `taskinstance` VALUES (100, '100', 100, 0, NULL);
INSERT INTO `taskinstance` VALUES (101, '101', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (102, '102', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (103, '103', 103, 0, NULL);
INSERT INTO `taskinstance` VALUES (104, '104', 104, 1, '2025-02-28 11:25:51');
INSERT INTO `taskinstance` VALUES (105, '105', 105, 0, NULL);
INSERT INTO `taskinstance` VALUES (106, '106', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (107, '107', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (108, '108', 103, 0, NULL);
INSERT INTO `taskinstance` VALUES (109, '109', 109, 0, NULL);
INSERT INTO `taskinstance` VALUES (111, '111', 105, 0, NULL);
INSERT INTO `taskinstance` VALUES (112, '112', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (113, '113', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (114, '114', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (115, '115', 17, 0, NULL);

-- ----------------------------
-- Table structure for tasklabel
-- ----------------------------
DROP TABLE IF EXISTS `tasklabel`;
CREATE TABLE `tasklabel`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务标签表id，自增',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签名',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `notCustom` tinyint(1) NULL DEFAULT 0 COMMENT ' 是否属于用户自定义，1.否，0是',
  `isList` tinyint(1) NULL DEFAULT 0 COMMENT '是否属于清单，1.是，0.否',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '清单图标',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_isList`(`isList`) USING BTREE,
  INDEX `index_notCustom`(`notCustom`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tasklabel
-- ----------------------------
INSERT INTO `tasklabel` VALUES (1, '今天', NULL, NULL, 1, 1, 'today.png');
INSERT INTO `tasklabel` VALUES (2, '明天', NULL, NULL, 1, 1, 'tomorrow.png');
INSERT INTO `tasklabel` VALUES (3, '昨天', NULL, NULL, 1, 1, 'yesterday.png');
INSERT INTO `tasklabel` VALUES (4, '标签', NULL, NULL, 1, 1, 'labels.png');
INSERT INTO `tasklabel` VALUES (5, '已完成', NULL, NULL, 1, 1, 'finish.png');
INSERT INTO `tasklabel` VALUES (6, '已搁置', NULL, NULL, 1, 1, 'delay.png');
INSERT INTO `tasklabel` VALUES (7, '已取消', '2025-01-30 16:51:45', '2025-01-31 19:44:06', 1, 1, 'cancel.png');
INSERT INTO `tasklabel` VALUES (8, '垃圾桶', NULL, '2025-02-20 15:36:45', 1, 1, 'bin.png');
INSERT INTO `tasklabel` VALUES (22, 'q', '2025-02-21 16:30:49', NULL, 0, 0, 'label.png');
INSERT INTO `tasklabel` VALUES (25, 'q', '2025-02-22 17:17:10', NULL, 0, 1, 'list.png');

-- ----------------------------
-- Table structure for tasklabeloption
-- ----------------------------
DROP TABLE IF EXISTS `tasklabeloption`;
CREATE TABLE `tasklabeloption`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务标签页情况表id,自增',
  `taskId` bigint NULL DEFAULT NULL COMMENT '任务id',
  `labelId` bigint NULL DEFAULT NULL COMMENT '标签id',
  `listId` bigint NULL DEFAULT NULL COMMENT '列表id',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_taskId`(`taskId`) USING BTREE,
  INDEX `index_label_list_Id`(`labelId`, `listId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tasklabeloption
-- ----------------------------
INSERT INTO `tasklabeloption` VALUES (5, 84, NULL, 9, NULL);
INSERT INTO `tasklabeloption` VALUES (8, 87, NULL, 15, '2025-02-21 16:30:37');
INSERT INTO `tasklabeloption` VALUES (13, 91, 22, NULL, NULL);
INSERT INTO `tasklabeloption` VALUES (14, 92, NULL, 15, NULL);
INSERT INTO `tasklabeloption` VALUES (15, 96, NULL, 15, NULL);

-- ----------------------------
-- Table structure for taskreminder
-- ----------------------------
DROP TABLE IF EXISTS `taskreminder`;
CREATE TABLE `taskreminder`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务提醒，主键id,自增',
  `taskId` bigint NOT NULL COMMENT '任务id',
  `timing` datetime NULL DEFAULT NULL COMMENT '提醒时机，表述在任务开始之前的时间',
  `mode` tinyint(1) NULL DEFAULT NULL COMMENT '提醒模式，1.分钟，2.小时，3.天，4.周，5.月\r\n',
  `value` int NULL DEFAULT NULL COMMENT '提醒模式下的数值',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_task_id`(`taskId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskreminder
-- ----------------------------
INSERT INTO `taskreminder` VALUES (1, 17, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (2, 18, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (3, 19, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (4, 20, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (5, 21, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (6, 22, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (7, 24, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (8, 25, '2025-02-14 14:59:00', 1, 0);
INSERT INTO `taskreminder` VALUES (9, 26, '2025-02-15 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (10, 28, '2025-02-16 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (11, 47, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (12, 48, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (13, 49, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (14, 50, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (15, 51, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (16, 52, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (17, 53, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (18, 54, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (19, 55, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (20, 56, '2025-02-18 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (21, 61, '2025-02-19 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (22, 62, '2025-02-20 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (23, 86, '2025-02-21 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (24, 98, '2025-02-22 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (25, 101, '2025-02-26 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (26, 102, '2025-02-27 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (27, 104, '2025-02-27 20:18:00', 1, 0);
INSERT INTO `taskreminder` VALUES (28, 106, '2025-02-28 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (29, 107, '2025-03-01 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (30, 112, '2025-03-05 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (31, 113, '2025-03-02 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (32, 114, '2025-02-23 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (33, 115, '2025-03-11 10:13:07', 1, 0);

-- ----------------------------
-- Table structure for taskrepeatrule
-- ----------------------------
DROP TABLE IF EXISTS `taskrepeatrule`;
CREATE TABLE `taskrepeatrule`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id,自增',
  `taskId` bigint NULL DEFAULT NULL COMMENT '任务id，可重复任务信息更改重复规则时使用',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '任务状态更新时间',
  `period` int NULL DEFAULT NULL COMMENT '任务执行周期（不可重复任务值置空）',
  `periodUnit` tinyint(1) NULL DEFAULT NULL COMMENT '执行周期单位：1.天，2.周，3.月，4.年',
  `deadline` datetime NULL DEFAULT NULL COMMENT '重复截止时间',
  `custom` json NULL COMMENT '自定义规则',
  `count` int NULL DEFAULT NULL COMMENT '执行次数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_task_id`(`taskId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskrepeatrule
-- ----------------------------
INSERT INTO `taskrepeatrule` VALUES (1, 17, NULL, 1, 1, NULL, NULL, NULL);
INSERT INTO `taskrepeatrule` VALUES (2, 103, NULL, 2, 1, NULL, NULL, NULL);
INSERT INTO `taskrepeatrule` VALUES (3, 105, NULL, 1, 2, NULL, '{\"monday\": 1, \"wednesday\": 3}', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id，主键',
  `account` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账户',
  `email` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户电子邮箱',
  `password` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户登录密码',
  `nickname` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `avatar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `role` tinyint UNSIGNED NULL DEFAULT 1 COMMENT '1.管理员，2.普通用户，3.VIP用户\r\n',
  `createTime` datetime NULL DEFAULT NULL COMMENT '用户创建时间',
  `lastLoginTime` datetime NULL DEFAULT NULL COMMENT '用户上次登录时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '用户状态，1.正常，0.异常',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  INDEX `index_vip`(`role`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('U429852656852', '22985265685', '1816440933@qq.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '用户U429852656852', '4a3a2c6d-2e73-45a1-875f-e511551d1334.jpg', 1, '2025-02-22 11:06:20', '2025-03-12 10:35:20', 1);
INSERT INTO `user` VALUES ('U47811742828165', '4781174282', '2504319659@qq.com', '8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414', 'yyolu', 'default.png', 2, '2024-11-24 21:59:28', '2025-03-11 23:26:37', 1);
INSERT INTO `user` VALUES ('Uadmin', 'admin', '112131234', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'yolu', 'default.png', 1, '2025-02-02 15:20:13', '2025-03-11 22:47:32', 1);

-- ----------------------------
-- Table structure for usertasklabel
-- ----------------------------
DROP TABLE IF EXISTS `usertasklabel`;
CREATE TABLE `usertasklabel`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户标签表id，自增',
  `userId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `labelId` bigint NULL DEFAULT NULL COMMENT '标签id',
  `display` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 1 COMMENT '是否隐藏,1.是，0.否',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_userId_labelId`(`userId`, `labelId`) USING BTREE,
  INDEX `index_display`(`display`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usertasklabel
-- ----------------------------
INSERT INTO `usertasklabel` VALUES (1, 'U47811742828165', 1, 1, NULL);
INSERT INTO `usertasklabel` VALUES (2, 'U47811742828165', 2, 1, NULL);
INSERT INTO `usertasklabel` VALUES (3, 'U47811742828165', 3, 1, NULL);
INSERT INTO `usertasklabel` VALUES (4, 'U47811742828165', 4, 1, NULL);
INSERT INTO `usertasklabel` VALUES (5, 'U47811742828165', 5, 1, NULL);
INSERT INTO `usertasklabel` VALUES (6, 'U47811742828165', 6, 1, NULL);
INSERT INTO `usertasklabel` VALUES (7, 'U47811742828165', 7, 1, '2025-02-21 16:32:39');
INSERT INTO `usertasklabel` VALUES (8, 'U47811742828165', 8, 1, '2025-02-20 21:50:01');
INSERT INTO `usertasklabel` VALUES (17, 'U47811742828165', 9, 1, NULL);
INSERT INTO `usertasklabel` VALUES (18, 'U47811742828165', 10, 1, NULL);
INSERT INTO `usertasklabel` VALUES (19, 'U47811742828165', 11, 1, NULL);
INSERT INTO `usertasklabel` VALUES (20, 'U47811742828165', 12, 1, NULL);
INSERT INTO `usertasklabel` VALUES (41, 'U429852656852', 1, 1, NULL);
INSERT INTO `usertasklabel` VALUES (42, 'U429852656852', 2, 1, NULL);
INSERT INTO `usertasklabel` VALUES (43, 'U429852656852', 3, 1, NULL);
INSERT INTO `usertasklabel` VALUES (44, 'U429852656852', 4, 1, NULL);
INSERT INTO `usertasklabel` VALUES (45, 'U429852656852', 5, 1, NULL);
INSERT INTO `usertasklabel` VALUES (46, 'U429852656852', 6, 1, NULL);
INSERT INTO `usertasklabel` VALUES (47, 'U429852656852', 7, 1, NULL);
INSERT INTO `usertasklabel` VALUES (48, 'U429852656852', 8, 1, NULL);
INSERT INTO `usertasklabel` VALUES (49, 'U429852656852', 25, 1, '2025-02-22 17:22:19');

-- ----------------------------
-- Table structure for versionstatus
-- ----------------------------
DROP TABLE IF EXISTS `versionstatus`;
CREATE TABLE `versionstatus`  (
  `id` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版本id',
  `adminId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发布版本的操作者的id',
  `number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版号',
  `publishDate` date NULL DEFAULT NULL COMMENT '发布日期',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '版本描述信息',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `fileName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件名称',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '版本类型，1.正式版，2.α测试版，3.β测试版,4.γ测试版',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `index_number`(`number`) USING BTREE,
  INDEX `index_createTime`(`createTime`) USING BTREE,
  INDEX `index_type`(`type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of versionstatus
-- ----------------------------
INSERT INTO `versionstatus` VALUES ('V27Uyv4CD4Q0', 'admin', '20250203_1.0alpha', '2025-02-03', '第一测试版', '2025-02-03 12:54:18', 'example.download', 2);
INSERT INTO `versionstatus` VALUES ('Vc1edegcG8UGG', 'admin', 'v1.0.0', '2025-02-07', '第一个伪测试版', '2025-02-07 13:35:42', 'v1.0.0.wgt', 1);
INSERT INTO `versionstatus` VALUES ('VP1ahLWIWD6', 'Uadmin', 'v1.0.1', '2025-03-11', '修复一些bug，优化应用体验', '2025-03-11 22:48:30', 'v1.0.1.wgt', 1);

SET FOREIGN_KEY_CHECKS = 1;
