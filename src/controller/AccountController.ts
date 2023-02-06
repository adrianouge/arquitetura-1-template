import { Request, Response } from "express"
import { AccountBusiness } from "../business/AccountBusiness"
import { AccountDatabase } from "../database/AccountDatabase"
import { Account } from "../models/Account"
import { AccountDB } from "../types"

export class AccountController {
    public getAccounts = async (req: Request, res: Response) => {
        try {
            const accountBusiness = new AccountBusiness()
            const getAccounts = await accountBusiness.getAccounts()

            res.status(200).send(getAccounts)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getAccountBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const accountBusiness = new AccountBusiness()
            const getAccountBalance = await accountBusiness.getAccountBalance(id)

            res.status(200).send(getAccountBalance)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createAccount = async (req: Request, res: Response) => {
        try {
            const input = { id: req.body.id, ownerId: req.body.ownerId }

            const accountBusiness = new AccountBusiness()
            const createAccount = await accountBusiness.createAccount(input)
            res.status(201).send(createAccount)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editAccountBalance = async (req: Request, res: Response) => {
        try {
            const input = { id: req.params.id, value: req.body.value }
            
            const accountBusiness = new AccountBusiness()
            const editAccount = await accountBusiness.editAccount(input)

            res.status(200).send(editAccount)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}