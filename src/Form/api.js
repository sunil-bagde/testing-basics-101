export default {
    addUser : (name, email, number) => new Promise((res,rej) => res({name,email,number}))
}