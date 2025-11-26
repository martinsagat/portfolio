---
title: Service layer in frontend application
description: Introduce a service layers and keep your code organized within your Vue application.
date: 2022-08-03
draft: false
slug: /articles/vue-service-layer
tags:
  - Vue
  - JavaScript
  - TypeScript
  - Frontend
---

When working on a code base that scales up, one can easily get overwhelmed by the complexity of code if not implemented properly.

One of the ways that can help to prevent confusions and keep things in place for the long run is to establish a service layer. Service layer
is an additional layer between the backend and other components which consume data from our endpoints.
Let's have a look how this can be easily implemented in Nuxt (Framework that generates Vue.js application).

### Implementation Example

There is a requirement to create a page that will display a list of employees. We will receive the data from an API endpoint:

```json{}[result from: https://backend/api/employees]
[
  {
    "name": "James Smith",
    "age": 32,
    "role": "Accountant"
  },
  {
    "name": "Samantha Robberts",
    "age": 28,
    "role": "Product Owner"
  }
  // ...
]
```

Firstly, we need to create custom types based on the endpoint response:

```js{1}[types/employee.ts]
export interface Employee {
  name: string;
  age: number;
  role: string;
}
```

````js{1}[types/employeesResponse.ts]
import { Employee } from '~/types/employee'
export interface EmployeesResponse {
  data: Employee[];
}
```paragraph
For our application to consume the endpoint, we will create a service called "employees" with a method called list(), this method will return a promise with our employees (or error if the backend does not return expected result):

```js{1,3-5}[services/employees.ts]
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import type { Context, NuxtError } from '@nuxt/types'
import type { EmployeeResponse } from '~/types/apiResponses/employees'
import type { Employee } from '~/types/employee'

export default class Employees {
  axios: NuxtAxiosInstance
  error: Context['error']

  constructor(axios: NuxtAxiosInstance, error: Context['error']) {
    this.axios = axios
    this.error = error
  }

  async list(): Promise<Employees[] | undefined> {
    try {
      const response: any = await this.axios.get('employees')
      const employees: Employee[] = response.data
      return employees
    }
    catch (e: any) {
      this.error({
        message: e.response.message,
        path: '/error',
        statusCode: e.response.status,
      } as NuxtError)
    }
  }
}
````

paragraph
Next we are required to inject the service into Nuxt as plugin:

```js{1}[plugins/employees.ts]
import { Plugin } from '@nuxt/types'
import Employees from '~/services/employees'

const employees: Plugin = (context, inject) => {
  inject('employees', new Employees(context.$axios, context.error))
}

export default employees
```

Now we extend the Vue type with the new service we created:

```js{1}[types/vue.d.ts]
import Vue from 'vue'
import Employees from "~/services/employees";

declare module 'vue/types/vue' {
  interface Vue {
    $employees: Employees,
  }
}
```

Dont forget to include this file in tsconfig:

```js{1}[types/tsconfig.json]
{
  "files": [
    "types/vue.d.ts",
  ]
}
```

We can now call the employees service directly from anywhere within our application. On response success, we can set the received data into our store:

```js{1}[components/employees.ts]
created() {
    this.$employees.list().then( async (employees) => {
      await this.$store.dispatch('employees/set', employees)
    })
}
```

Congratulations, you have implemented your first service inside yout Nuxt application. You can learn more about store and how to manage application state using VueX and Typescript in next [article](/articles/2).
