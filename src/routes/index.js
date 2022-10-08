const express = require("express");
const routes = express.Router();

const { verifyUser } = require("../middlewares");

const {
    login,
    register,
    getAllChecklist,
    createChecklist,
    deleteChecklist,
    createListItem,
    getListitem,
    getListItemById,
    updateStatusListItem,
    deleteListItem,
    renameListItem
} = require("../controllers");

routes.post('/login', login);
routes.post('/register', register);

routes.get('/checklist', verifyUser, getAllChecklist);
routes.post('/checklist', verifyUser, createChecklist);
routes.delete('/checklist/:id', verifyUser, deleteChecklist);

routes.get('/checklist/:checklistId/item', verifyUser, getListitem);
routes.post('/checklist/:checklistId/item', verifyUser, createListItem);
routes.get('/checklist/:checklistId/item/:id', verifyUser, getListItemById);
routes.put('/checklist/:checklistId/item/:id', verifyUser, updateStatusListItem);
routes.delete('/checklist/:checklistId/item/:id', verifyUser, deleteListItem);
routes.put('/checklist/:checklistId/item/rename/:id', verifyUser, renameListItem);

module.exports = routes;