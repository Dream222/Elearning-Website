import { Injectable } from '@angular/core';

@Injectable()
export class LoadingHandlerService
{
    static show()
    {
        const body = document.body;

        if (!body.classList.contains('loading'))
        {
            body.classList.add('loading');
        }
    }

    static hide()
    {
        const body = document.body;

        if (body.classList.contains('loading'))
        {
            body.classList.remove('loading');
        }
    }
}
