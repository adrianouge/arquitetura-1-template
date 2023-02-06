import { AccountDatabase } from "../database/AccountDatabase";
import { Account } from "../models/Account";
import { AccountDB } from "../types";

export class AccountBusiness {
    public getAccounts = async () => {
        const accountDatabase = new AccountDatabase()
        const accountsDB: AccountDB[] = await accountDatabase.findAccounts()

        const accounts = accountsDB.map((accountDB) => new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        ))

        const output = { message: "Todas as contas:", accounts }
        return ({ output })
    }

    public getAccountBalance = async (id: string) => {
        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(id)

        if (!accountDB) {
            throw new Error("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const balance = account.getBalance()

        const output = { message: `O balanço da conta é: ${balance}` }

        return (output)
    }

    public createAccount = async (input: any) => {
        const { id, ownerId } = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof ownerId !== "string") {
            throw new Error("'ownerId' deve ser string")
        }

        const accountDatabase = new AccountDatabase()
        const accountDBExists = await accountDatabase.findAccountById(id)

        if (accountDBExists) {
            throw new Error("'id' já existe")
        }

        const newAccount = new Account(
            id,
            0,
            ownerId,
            new Date().toISOString()
        )

        const newAccountDB: AccountDB = {
            id: newAccount.getId(),
            balance: newAccount.getBalance(),
            owner_id: newAccount.getOwnerId(),
            created_at: newAccount.getCreatedAt()
        }

        await accountDatabase.insertAccount(newAccountDB)

        const output = { message: "Conta registrada com sucesso", account: newAccountDB }

        return (output)
    }

    public editAccount = async (input: any) => {
        const { id, value } = input

        if (typeof value !== "number") {
            throw new Error("'value' deve ser number")
        }

        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(id)

        if (!accountDB) {
            throw new Error("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const newBalance = account.getBalance() + value
        account.setBalance(newBalance)

        await accountDatabase.updateBalanceById(id, newBalance)

        const output = { message: `O balanço foi atulizado de ${accountDB.balance} para ${newBalance}.` }

        return (output)
    }
}