import { clerkClient, getAuth } from '@clerk/express';

export const roles = async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await clerkClient.users.getUser(userId);
        const role = user.privateMetadata.role || null;

        res.json({ role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const setRole = async (req, res) => {
  const { userId } = getAuth(req);
  const { role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: "Missing user or role" });
  }

  try {
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        role,
      },
    });

    res.json({ message: `Role '${role}' set successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
