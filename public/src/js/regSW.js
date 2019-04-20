
const pushButton = document.querySelector('#navPush');

/*function updateBtn() {
    if (isSubscribed) {
        pushButton.textContent = 'Disable Push';
    } else {
        pushButton.textContent = 'Enable Push';
    }

    pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    if (subscription) {
        console.log(JSON.stringify(subscription));
    } else {
        console.warn(JSON.stringify(subscription));
    }
}

function subscribeUser() {
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true
    })
        .then(function (subscription) {
            console.log('User is subscribed.');

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn();
        });
}

function initializeUI() {
    pushButton.addEventListener('click', function () {
        pushButton.disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            updateSubscriptionOnServer(subscription);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }

            updateBtn();
        });
}*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js').then(function (swReg) {
        console.log('SW registered', swReg);
        swRegistration = swReg;
        initializeUI();
    });
}
if ('PushManager' in window) {
    console.log('Push is supported');
} else {
    console.warn("Push messaging is not supported");
    pushButton.textContent = 'Push Not Supported';
}