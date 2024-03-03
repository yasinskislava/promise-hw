const delay = ms => {
    const promise = new Promise((res, rej) => {
        setTimeout(() => { res(ms) }, ms);
    });
    return promise;
};

const logger = time => console.log(`Resolved after ${time}ms`);

// Виклич функції для перевірки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

//////////////////////////////////////////////////////////////////////

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
    const updatedUsers = allUsers.map(user =>
        user.name === userName ? { ...user, active: !user.active } : user
    );
    const promise = new Promise((resolve, reject) => {
        resolve(updatedUsers);
    });
    return promise;
};

const logger1 = updatedUsers => console.table(updatedUsers);
/*
 * Зараз працює так
 */
// toggleUserState(users, 'Mango', logger1);
// toggleUserState(users, 'Lux', logger1);

/*
 * Повинно працювати так
 */
toggleUserState(users, 'Mango').then(logger1);
toggleUserState(users, 'Lux').then(logger1);

// //////////////////////////////////////////////////////////////////////

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
    const delay = randomIntegerFromInterval(200, 500);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          const canProcess = Math.random() > 0.3;
          if (canProcess) {
            resolve(transaction.id, delay);
          } else {
            reject(transaction.id);
          }
        }, delay);
    });
    return promise;
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Працює так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Повинно працювати так
 */
makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);
