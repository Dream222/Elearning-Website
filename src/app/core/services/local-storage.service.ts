import { Injectable } from '@angular/core';

import { UserModel } from '@app/core/models';
import { ExampleTestAnswerModel, ChooseAnswerExampleTestQuestionModel } from '@app/example/models';

@Injectable()
export class LocalStorageService
{
    static get(key: string): any | null
    {
        const data = localStorage.getItem(key);

        if (!data || data === 'undefined')
        {
            return null;
        }
        return JSON.parse(data);
    }

    static set(key: string, data: any)
    {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static remove(key: string)
    {
        localStorage.removeItem(key);
    }

    static getToken(): string
    {
        return this.get('token');
    }

    static setToken(token: string)
    {
        this.set('token', token);
    }

    static getUser()
    {
        return this.get("account");
    }

    static setUser(user)
    {
        this.set('account', user);
    }

    static login(data: { token: string, user: UserModel })
    {
        this.setUser(data.user);
        this.setToken(data.token);
    }

    static logout()
    {
        this.remove('account');
        this.remove('token');
    }

    static setExampleAnswers(answers: { question: ChooseAnswerExampleTestQuestionModel, answer: ExampleTestAnswerModel }[])
    {
        this.set('answers', answers);
    }

    static getExampleAnswers(): { question: ChooseAnswerExampleTestQuestionModel, answer: ExampleTestAnswerModel }[]
    {
        return this.get('answers');
    }

    static removeExampleAnswers()
    {
        this.remove('answers');
    }

    static clear()
    {
        localStorage.clear();
    }
}
