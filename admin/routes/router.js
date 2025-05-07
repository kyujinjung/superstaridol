const express = require("express");
const router = express.Router();
const {getAllList, createContents} = require("../controllers/sampleController");
const {getMissionList, createMission, updateMission, deleteMission} = require("../controllers/missionController");
const {getMissionTypeList, createMissionType, updateMissionType, deleteMissionType} = require("../controllers/missiontypeController");
const {getExpList, createExp, updateExp, deleteExp} = require("../controllers/expController");
const {getUserList, createUser} = require("../controllers/userController");
const {getManagerList,getProducerList} = require("../controllers/managerController");
const {getGroupList, createGroup} = require("../controllers/groupController");
const {getAdminList, createAdmin} = require("../controllers/adminController");
const {getNpcList, createNpc, updateNpc, deleteNpc} = require("../controllers/npcController");
const {getIdolList} = require("../controllers/idolController");
const {getScheduleList, createSchedule, updateSchedule, deleteSchedule} = require("../controllers/scheduleController");
const {getItemList, createItem, updateItem, deleteItem} = require("../controllers/itemController");
const {chkUserLogin} = require("../controllers/loginController");
const {getTokenAiley} = require("../controllers/apiController");
const {getCsvList, createCsv} = require("../controllers/csvController");


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

router.route("/csv")
.get(getCsvList)
.post(createCsv);

router.route("/manager")
.get(getManagerList)

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