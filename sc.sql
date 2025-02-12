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

 Date: 11/02/2025 22:28:27
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
INSERT INTO `habit` VALUES ('H10895488584113', 'U28533327585573', 'q', '3158ff1b-a19c-4f55-90d7-950ddc9b94e5.jpg', '2025-01-17 21:54:40', '2025-01-17', 7, 'q', '2025-01-17 22:13:24', 0);
INSERT INTO `habit` VALUES ('H36176125942', 'U47811742828165', '起飞式锻炼', 'exercise.png', '2025-01-09 10:34:55', '2025-01-01', 6, '起飞，欸飞~', NULL, 0);
INSERT INTO `habit` VALUES ('H4024690107768', 'U47811742828165', '123', 'habit.png', '2025-01-24 16:16:49', '2025-01-27', 1, '12', '2025-01-28 09:19:07', 0);
INSERT INTO `habit` VALUES ('H568694593215', 'U47811742828165', '快乐cheems', 'fe259405-f999-4237-b2d6-b82caa2b2d56.jpg', '2025-01-17 16:22:55', '2025-01-17', 3, '快乐cheems，happy every day！', '2025-01-17 16:52:21', 0);
INSERT INTO `habit` VALUES ('H5791865054', 'U47811742828165', '阅读', 'reading.png', '2025-01-09 10:54:47', '2025-01-01', 2, '阅读使人受益', '2025-01-11 15:12:18', 0);
INSERT INTO `habit` VALUES ('H612712257344', 'U47811742828165', '12', 'habit.png', '2025-01-09 10:26:48', '2025-01-01', 2, '飞', '2025-01-31 21:00:35', 0);
INSERT INTO `habit` VALUES ('H81035800324', 'U28533327585573', 'q', 'habit.png', '2025-01-21 10:28:09', '2025-01-21', 8, 'q', '2025-01-21 10:36:48', 0);

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
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitfrequency
-- ----------------------------
INSERT INTO `habitfrequency` VALUES (1, 'H612712257344', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (2, 'H36176125942', NULL, NULL, 3, NULL);
INSERT INTO `habitfrequency` VALUES (3, 'H5791865054', NULL, 4, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (28, 'H568694593215', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (29, 'H10895488584113', NULL, NULL, 3, NULL);
INSERT INTO `habitfrequency` VALUES (30, 'H81035800324', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);
INSERT INTO `habitfrequency` VALUES (31, 'H4024690107768', '{\"friday\": 5, \"monday\": 1, \"sunday\": 0, \"tuesday\": 2, \"saturday\": 6, \"thursday\": 4, \"wednesday\": 3}', NULL, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitgroup
-- ----------------------------
INSERT INTO `habitgroup` VALUES (1, 'U47811742828165', '早晨', 1, NULL);
INSERT INTO `habitgroup` VALUES (2, 'U47811742828165', '上午', 2, NULL);
INSERT INTO `habitgroup` VALUES (3, 'U47811742828165', '中午', 3, NULL);
INSERT INTO `habitgroup` VALUES (4, 'U47811742828165', '下午', 4, NULL);
INSERT INTO `habitgroup` VALUES (5, 'U47811742828165', '晚上', 5, NULL);
INSERT INTO `habitgroup` VALUES (6, 'U47811742828165', '其他', 6, NULL);
INSERT INTO `habitgroup` VALUES (7, 'U28533327585573', '早晨', 1, NULL);
INSERT INTO `habitgroup` VALUES (8, 'U28533327585573', '上午', 2, NULL);
INSERT INTO `habitgroup` VALUES (9, 'U28533327585573', '中午', 3, NULL);
INSERT INTO `habitgroup` VALUES (10, 'U28533327585573', '下午', 4, NULL);
INSERT INTO `habitgroup` VALUES (11, 'U28533327585573', '晚上', 5, NULL);
INSERT INTO `habitgroup` VALUES (12, 'U28533327585573', '其他', 6, NULL);
INSERT INTO `habitgroup` VALUES (13, 'U47811742828165', '起飞', 7, NULL);
INSERT INTO `habitgroup` VALUES (15, 'U47811742828165', '起大飞', 8, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitoption
-- ----------------------------
INSERT INTO `habitoption` VALUES (1, 'H612712257344', 100, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (2, 'H36176125942', -1, NULL, 0, 0, 1);
INSERT INTO `habitoption` VALUES (3, 'H5791865054', 30, NULL, 8, 0, 8);
INSERT INTO `habitoption` VALUES (26, 'H0963540585', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (27, 'H773687026891', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (28, 'H568694593215', -1, NULL, 0, 0, 0);
INSERT INTO `habitoption` VALUES (29, 'H10895488584113', -1, NULL, 0, 0, 1);
INSERT INTO `habitoption` VALUES (30, 'H81035800324', -1, NULL, 0, 0, 1);
INSERT INTO `habitoption` VALUES (31, 'H4024690107768', -1, NULL, 0, 0, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `habitrecord` VALUES (33, NULL, 'H10895488584113', 0, '2025-02-01', NULL);
INSERT INTO `habitrecord` VALUES (34, NULL, 'H81035800324', 0, '2025-02-01', NULL);
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
INSERT INTO `habitrecord` VALUES (49, NULL, 'H10895488584113', 0, '2025-02-07', NULL);
INSERT INTO `habitrecord` VALUES (50, NULL, 'H81035800324', 0, '2025-02-07', NULL);
INSERT INTO `habitrecord` VALUES (51, NULL, 'H81035800324', 0, '2025-02-06', NULL);
INSERT INTO `habitrecord` VALUES (52, NULL, 'H4024690107768', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (53, NULL, 'H568694593215', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (54, NULL, 'H612712257344', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (55, NULL, 'H10895488584113', 0, '2025-02-10', NULL);
INSERT INTO `habitrecord` VALUES (56, NULL, 'H81035800324', 0, '2025-02-10', '2025-02-10 17:31:11');
INSERT INTO `habitrecord` VALUES (57, NULL, 'H81035800324', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (58, NULL, 'H4024690107768', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (59, NULL, 'H568694593215', 0, '2025-02-11', NULL);
INSERT INTO `habitrecord` VALUES (60, NULL, 'H612712257344', 0, '2025-02-11', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habitreminder
-- ----------------------------

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
  `labelId` bigint NULL DEFAULT NULL COMMENT '用户自定义标签时带有的标签id',
  `finishTime` datetime NULL DEFAULT NULL COMMENT '任务完成时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_begin_time`(`beginTime`) USING BTREE,
  INDEX `index_end_time`(`endTime`) USING BTREE,
  INDEX `index_label_id`(`labelId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, 'U47811742828165', '2025-01-23 16:51:00', '2025-01-23 16:32:00', '2025-01-25 17:32:00', '1', 4, '1', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (2, 'U47811742828165', '2025-01-26 21:57:44', '2025-01-27 21:57:00', '2025-01-27 22:57:00', '1', 4, '1', 4, 0, '2025-01-28 10:18:09', NULL, NULL);
INSERT INTO `task` VALUES (3, 'U47811742828165', '2025-01-26 22:02:10', '2025-01-27 22:02:00', '2025-01-27 23:02:00', '2', 4, '2', 4, 0, '2025-01-28 10:18:09', NULL, NULL);
INSERT INTO `task` VALUES (4, 'U47811742828165', '2025-01-27 15:30:44', '2025-01-27 15:30:00', '2025-01-27 16:30:00', '23', 4, '23', 4, 0, '2025-01-28 10:18:09', 54, NULL);
INSERT INTO `task` VALUES (5, 'U47811742828165', '2025-01-27 15:40:43', '2025-01-27 15:40:00', '2025-01-27 16:40:00', '45', 4, '32', 4, 0, '2025-01-28 10:18:09', 54, NULL);
INSERT INTO `task` VALUES (6, 'U47811742828165', '2025-01-27 15:59:38', '2025-01-27 16:32:00', '2025-01-27 17:32:00', 'q2', 4, '无标题', 4, 0, '2025-01-28 10:18:09', 54, NULL);
INSERT INTO `task` VALUES (8, 'U47811742828165', '2025-01-31 20:43:47', '2025-01-31 20:43:00', '2025-01-31 21:43:00', '12', 4, '12', 4, 0, '2025-02-01 14:57:56', 1, NULL);
INSERT INTO `task` VALUES (9, 'U28533327585573', '2025-02-01 08:52:06', '2025-02-01 08:52:00', '2025-02-01 09:52:00', 'q', 4, 'q', 2, 0, NULL, 1, NULL);
INSERT INTO `task` VALUES (10, 'U47811742828165', '2025-02-06 12:35:42', '2025-02-06 12:35:00', '2025-02-06 13:35:00', '1', 4, '1', 1, 0, '2025-02-06 12:46:40', 1, '2025-02-06 13:00:00');
INSERT INTO `task` VALUES (11, 'U47811742828165', '2025-02-07 10:33:39', '2025-02-07 10:33:00', '2026-02-08 11:33:00', '1', 4, '1', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (12, 'U47811742828165', '2025-02-07 10:45:36', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '2', 4, '2', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (13, 'U47811742828165', '2025-02-07 10:45:43', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '3', 4, '3', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (14, 'U47811742828165', '2025-02-07 10:45:46', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '4', 4, '4', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (15, 'U47811742828165', '2025-02-07 10:45:50', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '5', 4, '5', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (16, 'U47811742828165', '2025-02-07 10:45:55', '2025-02-07 10:45:00', '2025-02-07 11:45:00', '6', 4, '6', 2, 0, NULL, NULL, NULL);
INSERT INTO `task` VALUES (17, 'U47811742828165', '2025-02-10 10:14:31', '2025-02-10 10:13:07', '2025-02-10 11:13:07', '1', 4, '1', 4, 1, '2025-02-11 16:57:33', NULL, NULL);
INSERT INTO `task` VALUES (18, 'U47811742828165', '2025-02-10 10:30:47', '2025-02-11 10:13:07', '2025-02-11 11:13:07', '1', 4, '1', 2, 1, NULL, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `taskinstance` VALUES (9, '9', 9, 0, NULL);
INSERT INTO `taskinstance` VALUES (10, '10', 10, 0, NULL);
INSERT INTO `taskinstance` VALUES (11, '11', 11, 1, '2025-02-07 10:50:09');
INSERT INTO `taskinstance` VALUES (12, '12', 12, 0, NULL);
INSERT INTO `taskinstance` VALUES (13, '13', 13, 0, NULL);
INSERT INTO `taskinstance` VALUES (14, '14', 14, 0, NULL);
INSERT INTO `taskinstance` VALUES (15, '15', 15, 0, NULL);
INSERT INTO `taskinstance` VALUES (16, '16', 16, 0, NULL);
INSERT INTO `taskinstance` VALUES (17, '17', 17, 0, NULL);
INSERT INTO `taskinstance` VALUES (18, '18', 17, 0, NULL);

-- ----------------------------
-- Table structure for tasklabel
-- ----------------------------
DROP TABLE IF EXISTS `tasklabel`;
CREATE TABLE `tasklabel`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务标签表id，自增',
  `userId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务表关联的用户id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签名',
  `display` tinyint(1) NULL DEFAULT 1 COMMENT '显示模式，1.显示，0.隐藏',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `notCustom` tinyint(1) NULL DEFAULT 0 COMMENT ' 是否属于用户自定义，1.否，0是',
  `isList` tinyint(1) NULL DEFAULT 0 COMMENT '是否属于清单，1.是，0.否',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '清单图标',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_userId`(`userId`) USING BTREE,
  INDEX `index_isList`(`isList`) USING BTREE,
  INDEX `index_notCustom`(`notCustom`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tasklabel
-- ----------------------------
INSERT INTO `tasklabel` VALUES (1, NULL, '今天', 1, NULL, NULL, 1, 1, 'today.png');
INSERT INTO `tasklabel` VALUES (2, NULL, '明天', 1, NULL, NULL, 1, 1, 'tomorrow.png');
INSERT INTO `tasklabel` VALUES (3, NULL, '昨天', 1, NULL, NULL, 1, 1, 'yesterday.png');
INSERT INTO `tasklabel` VALUES (4, NULL, '标签', 1, NULL, NULL, 1, 1, 'labels.png');
INSERT INTO `tasklabel` VALUES (5, NULL, '已完成', 1, NULL, NULL, 1, 1, 'finish.png');
INSERT INTO `tasklabel` VALUES (6, NULL, '已搁置', 1, NULL, NULL, 1, 1, 'delay.png');
INSERT INTO `tasklabel` VALUES (7, NULL, '已取消', 1, '2025-01-30 16:51:45', '2025-01-31 19:44:06', 1, 1, 'cancel.png');
INSERT INTO `tasklabel` VALUES (8, NULL, '垃圾桶', 1, NULL, '2025-01-30 16:51:30', 1, 1, 'bin.png');
INSERT INTO `tasklabel` VALUES (54, 'U47811742828165', 'q', 1, '2025-01-27 15:30:32', '2025-02-01 15:31:37', 0, 0, 'ac711997-abef-476a-9f94-471621c7ad4d.jpg');
INSERT INTO `tasklabel` VALUES (55, 'U47811742828165', '1', 0, '2025-01-27 20:38:38', '2025-01-27 22:06:12', 0, 1, 'list.png');
INSERT INTO `tasklabel` VALUES (56, 'U47811742828165', '23', 1, '2025-01-27 20:38:52', '2025-01-27 22:06:35', 0, 1, 'list.png');
INSERT INTO `tasklabel` VALUES (57, 'U47811742828165', '23', 0, '2025-01-27 20:51:37', '2025-01-27 22:04:52', 0, 0, 'label.png');
INSERT INTO `tasklabel` VALUES (59, 'U47811742828165', 'qq', 1, '2025-02-01 15:37:28', '2025-02-01 15:37:28', 0, 0, '37594605-5544-4b7b-8b98-c3f1fac61ba0.jpg');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskreminder
-- ----------------------------
INSERT INTO `taskreminder` VALUES (1, 17, '2025-02-10 10:13:07', 1, 0);
INSERT INTO `taskreminder` VALUES (2, 18, '2025-02-10 10:13:07', 1, 0);

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskrepeatrule
-- ----------------------------
INSERT INTO `taskrepeatrule` VALUES (1, 17, NULL, 1, 1, NULL, NULL, NULL);

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
INSERT INTO `user` VALUES ('U28533327585573', '2853332758', '1816440933@qq.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'sasuke', '599fe04d-04b5-476c-9b7e-7904ac9bcc82.jpg', 2, '2024-12-16 16:44:12', '2025-02-11 10:54:00', 1);
INSERT INTO `user` VALUES ('U47811742828165', '4781174282', '2504319659@qq.com', '8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414', 'yyolu', 'default.png', 2, '2024-11-24 21:59:28', '2025-02-11 17:29:07', 1);
INSERT INTO `user` VALUES ('Uadmin', 'admin', '112131234', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'yolu', 'default.png', 1, '2025-02-02 15:20:13', '2025-02-11 20:23:15', 1);

-- ----------------------------
-- Table structure for versionstatus
-- ----------------------------
DROP TABLE IF EXISTS `versionstatus`;
CREATE TABLE `versionstatus`  (
  `id` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版本id',
  `adminId` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发布版本的操作者的id',
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

SET FOREIGN_KEY_CHECKS = 1;
