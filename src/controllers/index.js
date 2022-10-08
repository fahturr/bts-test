const { models } = require("../models");

const {
    hashPassword, verifyPassword, generateToken
} = require("../helpers")

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await models.User.findOne({ where: { username } });
        const token = await generateToken({ id: user.dataValues._id });

        if (await verifyPassword(password, user.password)) {
            res.status(200).json({ message: 'login success', data: { token } });
        } else {
            res.status(400).json({ message: 'username or password is false' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await hashPassword(password);

        await models.User.create({
            email,
            username,
            password: hashedPassword
        });

        res.status(200).json({ message: 'user has been registered' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getAllChecklist = async (req, res) => {
    try {
        const checklists = await models.Checklist.findAll({
            where: {
                userId: req.data.id
            }
        });

        res.status(200).json({ message: 'success get checklist', data: checklists });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.createChecklist = async (req, res) => {
    try {
        const { name } = req.body;

        await models.Checklist.create({ name, userId: req.data.id });

        res.status(200).json({ message: 'checklist has been created' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteChecklist = async (req, res) => {
    try {
        const { id } = req.params;

        const checklist = await models.Checklist.findByPk(id);

        checklist.destroy();

        res.status(200).json({ message: 'checklist has been deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getListitem = async (req, res) => {
    try {
        const { checklistId } = req.params;

        const listitem = await models.Listitem.findAll({
            where: { checklistId }
        });

        res.status(200).json({
            message: `success fetch list item data from checklist:${checklistId}`,
            data: listitem
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.createListItem = async (req, res) => {
    try {
        const { checklistId } = req.params;
        const { itemName } = req.body;

        await models.Listitem.create({
            itemName, checklistId
        });

        res.status(200).json({ message: 'list item has been created' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getListItemById = async (req, res) => {
    try {
        const { checklistId, id } = req.params;

        const listitem = await models.Listitem.findAll({
            where: { checklistId, id }
        });

        res.status(200).json({
            message: `success fetch list item data from checklist:${checklistId}`,
            data: listitem
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateStatusListItem = async (req, res) => {
    try {
        const { checklistId, id } = req.params;

        const listitem = await models.Listitem.findAll({
            where: { checklistId, id }
        });

        listitem.update({ isDone: true });

        res.status(200).json({ message: 'success updating status list item' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteListItem = async (req, res) => {
    try {
        const { checklistId, id } = req.params;

        const listitem = await models.Listitem.findAll({
            where: { checklistId, id }
        });

        listitem.destroy();

        res.status(200).json({ message: 'list item has been deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.renameListItem = async (req, res) => {
    try {
        const { checklistId, id } = req.params;
        const { itemName } = req.body;

        const listitem = await models.Listitem.findAll({
            where: { checklistId, id }
        });

        listitem.update({ itemName });

        res.status(200).json({ message: 'success renaming list item name' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};