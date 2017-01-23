/**
 * Created by nitin on 23/1/17.
 */
var moment= require('moment');
var now = moment();
/*console.log(now.format());
now.subtract(1,'year');
console.log(now.format());*/
/*
console.log(now.format('MMM Do YYYY, h:mm a'));*/  //prints Jan 23rd 2017, 8:40 pm
console.log(now.format('X'));   //prints utc timestamp
console.log(now.valueOf());        //prints and saves utc timestamp


var timestamp = 1485184206465;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mm a'));