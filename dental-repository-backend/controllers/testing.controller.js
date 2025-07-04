import express from 'express';

export const testing = async (req,res) => {
    res.status(200).json({
        message: 'Testing endpoint is working correctly',
        timestamp: new Date().toISOString(),
    });
}