export default function postConsoleWarning () {
    const logA = ['⚠️ WARNING! ⚠️', 'font-family: monospace; font-weight: 900; color: red; font-size: 42px;'];
    const logB = ['Pasting anything in here can give attackers access to your account.', 'font-family: monospace; text-decoration: underline; font-weight: 600; color: #fff; font-size: 20px;'];
    const logC = ['This is a feature intended for developer use. If someone is asking you to paste something here, then it is hyper-likely to be a scam.', 'font-family: monospace; font-weight: 600; font-size: 18px;'];
    const logD = ['Unless you know exactly what you are doing, simply close this window.', 'font-family: monospace; font-weight: 400; font-size: 16px;'];

    setTimeout(console.log.bind(console, '\n%c' + logA[0], logA[1]));
    setTimeout(console.log.bind(console, '\n%c' + logB[0], logB[1]));
    setTimeout(console.log.bind(console, '\n%c' + logC[0], logC[1]));
    setTimeout(console.log.bind(console, '\n%c' + logD[0], logD[1]));
};