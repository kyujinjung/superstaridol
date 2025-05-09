const express = require("express");
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const db = require("../db");
const conn = db.conn;

const router = express.Router();
const {getAllList, createContents} = require("../controllers/sampleController");
const {getMissionList, createMission, updateMission, deleteMission} = require("../controllers/missionController");
const {getMissionTypeList, createMissionType, updateMissionType, deleteMissionType} = require("../controllers/missiontypeController");
const {getExpList, createExp, updateExp, deleteExp} = require("../controllers/expController");
const {getUserList, createUser} = require("../controllers/userController");
const {getManagerList,getProducerList} = require("../controllers/managerController");
const {getMailList, createMail, deleteMail} = require("../controllers/mailController");
const {getGroupList, createGroup} = require("../controllers/groupController");
const {getAdminList, createAdmin} = require("../controllers/adminController");
const {getNpcList, createNpc, updateNpc, deleteNpc} = require("../controllers/npcController");
const {getIdolList} = require("../controllers/idolController");
const {getScheduleList, createSchedule, updateSchedule, deleteSchedule} = require("../controllers/scheduleController");
const {getItemList, createItem, updateItem, deleteItem} = require("../controllers/itemController");
const {chkUserLogin} = require("../controllers/loginController");
const {getTokenAiley} = require("../controllers/apiController");

// xlsx 업로드 떄문에 추가함함
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });
  
const upload = multer({ storage });


router.route('/csv')
// GET /upload - 폼 렌더링
.get((req, res) => {res.render("csv", {now_loc : "csv"});})
// POST /upload - 파일 처리
.post(upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).send('파일이 없습니다.');

    const workbook = XLSX.readFile(req.file.path);

    // exp 
    const sheet = workbook.Sheets[workbook.SheetNames[1]];
    const rows_1 = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows_1) {
        const {id,lv, exp} = row;
        conn.query(`update exp set level = '${lv}', exp = '${exp}' where num = ${id}`);
    }

    // schedule 
    const schedule = workbook.Sheets[workbook.SheetNames[2]];
    const rows_2 = XLSX.utils.sheet_to_json(schedule);

    for (const row of rows_2) {
        const {id, name, req_level, req_time, reward_exp, reward_popular, reward_attract, reward_jenny} = row;
        conn.query(`update schedule set 
            name = '${name}', req_level = '${req_level}', req_time = '${req_time}' , reward_exp = '${reward_exp}' , reward_popular = '${reward_popular}' , reward_attract = '${reward_attract}' , reward_jenny = '${reward_jenny}' 
            where num = ${id}`);
    }

    
    // npc 
    const npc = workbook.Sheets[workbook.SheetNames[3]];
    const rows_3 = XLSX.utils.sheet_to_json(npc);

    for (const row of rows_3) {
        const {id, name, type , ruby, popular, attractive, photo} = row;

        console.log(row);
        conn.query(`update npc set 
            name = '${name}', type = '${type}', ruby = '${ruby}' , popular = '${popular}' , attractive = '${attractive}' , photo = '${photo}'
            where num = ${id}`);
    }

    // item
    const item = workbook.Sheets[workbook.SheetNames[4]];
    const rows_4 = XLSX.utils.sheet_to_json(item);

    for (const row of rows_4) {
        const {id, name, req_jenny, req_level, extra_popular, extra_attract, reward_jenny, reward_ruby, photo, description} = row;

        const sql = `
        UPDATE item SET 
            name = ?, 
            req_jenny = ?, 
            req_level = ?, 
            extra_popular = ?, 
            extra_attract = ?, 
            reward_jenny = ?, 
            reward_ruby = ?, 
            photo = ?, 
            description = ?
        WHERE num = ?
        `;

        const values = [
        name,
        req_jenny,
        req_level,
        extra_popular,
        extra_attract,
        reward_jenny,
        reward_ruby,
        photo,
        description,
        id
        ];

        conn.query(sql, values, (err, results) => {
        if (err) {
            console.error('Update error:', err);
            return;
        }
        console.log('Update success:', results);
        });            
    }


    // mission 
    const mission = workbook.Sheets[workbook.SheetNames[5]];
    const rows_5 = XLSX.utils.sheet_to_json(mission);

    for (const row of rows_5) {
        const {id, name, req_level, max_level, type, req_rep, reward_exp, reward_popular, reward_attract, reward_jenny, reward_ruby, photo} = row;

        const sql = `
        UPDATE mission SET 
            name = ?, 
            req_level = ?, 
            max_level = ?, 
            type = ?, 
            req_rep = ?, 
            reward_exp = ?, 
            reward_popular = ?, 
            reward_attract = ?, 
            reward_jenny = ?,
            reward_ruby = ?,
            photo = ?
        WHERE num = ?
        `;

        const values = [name, req_level, max_level, type, req_rep, reward_exp, reward_popular, reward_attract, reward_jenny, reward_ruby, photo, id];

        conn.query(sql, values, (err, results) => {
        if (err) {
            console.error('Update error:', err);
            return;
        }
        console.log('Update success:', results);
        });  
    }

    // mission_type 
    const mission_type = workbook.Sheets[workbook.SheetNames[6]];
    const rows_6 = XLSX.utils.sheet_to_json(mission_type);

    for (const row of rows_6) {
        const {id, name} = row;

        const sql = `
        UPDATE mission_type SET 
            name = ?
        WHERE num = ?
        `;

        const values = [name,id];

        conn.query(sql, values, (err, results) => {
        if (err) {
            console.error('Update error:', err);
            return;
        }
        console.log('Update success:', results);
        });  
    }


    res.status(201).send("<script>alert('정상적으로 업데이트 되었습니다.'); location.href='/csv';</script>");    

});



router.route("/contacts")
.get(getAllList);

router
.route("/contacts/:id")
.post(createContents)
.get(getAllList)
.put((req, res) => {
    res.status(200);
    console.log(req.params);
    res.send("Contact Page" + req.params.id);
})
.delete((req, res) => {
    res.status(200);
    console.log(req.params);
    res.send("Contact Page" + req.params.id);
});

router.route("/user")
.get(getUserList)
.post(createUser);

router.route("/manager")
.get(getManagerList)

router.route("/mail")
.get(getMailList)
.delete(deleteMail)
.post(createMail);

router.route("/producer")
.get(getProducerList)

router.route("/idol")
.get(getIdolList)

router.route("/npc")
.get(getNpcList)
.put(updateNpc)
.delete(deleteNpc)
.post(createNpc);

router.route("/group")
.get(getGroupList)
.post(createGroup);

router.route("/schedule")
.get(getScheduleList)
.put(updateSchedule)
.delete(deleteSchedule)
.post(createSchedule);

router.route("/mission")
.get(getMissionList)
.put(updateMission)
.delete(deleteMission)
.post(createMission);


router.route("/mission_type")
.get(getMissionTypeList)
.put(updateMissionType)
.delete(deleteMissionType)
.post(createMissionType);

router.route("/exp")
.get(getExpList)
.put(updateExp)
.delete(deleteExp)
.post(createExp);


router.route("/item")
.get(getItemList)
.post(createItem)
.put(updateItem)
.delete(deleteItem);

router.route("/api/login")
.get(getTokenAiley);

router.route("/admin")
.get(getAdminList)
.post(createAdmin);

router.route("/login")
.post(chkUserLogin);


module.exports = router;