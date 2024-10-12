---
title: Using VueX and TypeScript in Nuxt
description: Learn how to manage your state within Nuxt application and write your state modules using typescript.
date: 2022-07-31
draft: false
slug: /articles/vuex
tags:
  - Vue
  - VueX
  - JavaScript
  - TypeScript
  - Frontend
---

VueX is a state management library. It holds data in centralised place which can be used from anywhere within the application. To learn more about VueX, you can visit the [original documentation](https://vuex.vuejs.org) where the concept is explained in detail.

In my previous [article](/articles/1). I have explained how we can create a service layer within our Nuxt application. Now let's take a look how we can store the returned values from our endpoints into the store.

Firstly, make sure you have created types for data you wish to store:

```js{1}[types/employee.ts]
export interface Employee {
  name: string;
  age: number;
  role: string;
}
```

We also require to create store index module. This module can have state with an empty object, but it is required for implementing other modules such the one we create (employees).

```js{1}[store/index.ts]
export interface RootState {}
export const state = (): RootState => ({})
```

Now we are ready to create module employees:

```js{1}[store/employees.ts]
import Vue from 'vue'
import { Employee } from '~/types/employee'
import { RootState } from '~/store/index'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface EmployeeState {
  employees: Employee[]
}

export const state = (): EmployeeState => ({
  employees: [] as Employee[],
})

export const getters: GetterTree<EmployeeState, RootState> = {
  get(state: EmployeeState): Employee[] {
    return state.employees
  },
}

export const MutationType = {
  SELECT: 'select',
  SET: 'set',
}

export const mutations: MutationTree<EmployeeState> = {
  [MutationType.SET]: (state: EmployeeState, employees: Employee[]) => {
    Vue.set(state, 'employees', employees)
  },
}

export const actions: ActionTree<EmployeeState, RootState> = {
  set({ commit }, employees: Employee[]) {
    commit(MutationType.SET, employees)
  }
}
```

## Using the module from a component

Calling a service to fetch data and set returned value to employees modules store:

```js{1}[pages/employees/index.ts]
created() {
 /*  to see where the $employees is coming from
  *  read my article about sercices: https://martinsagat.com/articles/1
  */
  this.$employees.list().then( async (employees) => {
    await this.$store.dispatch('employees/set', employees)
  })
}
```

Getting employees from the store to component:

```js{1}[pages/employees/index.ts]
computed: {
  employees() {
      return this.$store.getters['employees/get']
  }
}
```

An example of computed property using getter and setter:

```js{1}[store/index.ts]
computed: {
  employees: {
    get(): Employees {
      return this.$store.getters['employees/get']
    },
    set(employees: Employee[]) {
      this.$store.dispatch('employees/set', employees)
    }
  }
}
```
