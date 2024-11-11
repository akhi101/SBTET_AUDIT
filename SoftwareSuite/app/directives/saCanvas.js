$(function () {
    'use strict';
    angular
        .module('app').directive('saCanvas', function () {
            return {
                restrict: 'E',
                scope: { localRectangles: '=rectangleList' },
                template: '<canvas class="sa-canvas" width="1122" height="794"></canvas>',
                link: function (scope, element) {
                    var canvasElement = element.children()[0];
                    var ctx = canvasElement.getContext('2d');

                    var canvasOffset = element.children().offset();
                    var offsetX = canvasOffset.left;
                    var offsetY = canvasOffset.top;

                    // Are we drawing?
                    var drawing = false;

                    // the last coordinates before the current move
                    var mouseX;
                    var mouseY;
                    var startX;
                    var startY;
                    var currentX;
                    var currentY;

                    element.bind('mousedown', function (event) {
                        startX = event.offsetX;
                        startY = event.offsetY;

                        // begins new line
                        ctx.beginPath();

                        drawing = true;
                    });

                    element.bind('mousemove', function (event) {
                        if (drawing) {

                            // get current mouse position
                            currentX = event.offsetX;
                            currentY = event.offsetY;

                            mouseX = parseInt(event.clientX - offsetX);
                            mouseY = parseInt(event.clientY - offsetY);

                            var width = mouseX - startX;
                            var height = mouseY - startY;
                          
                          //  draw(currentX, currentY, width, height);

                            draw(startX, startY, currentX, currentY);

                            var imgFrame = new Image();
                            imgFrame.src = '../../../contents/img/Capture.png';
                            imgFrame.onload = function () {
                                ctx.drawImage(imgFrame, startX, startY, currentX, currentY);
                            };
                          
                           
                           
                            scope.$apply();
                        }

                    });

                    element.bind('mouseup', function (event) {
                        // stop drawing
                        drawing = false;
                    });

                    // canvas reset
                    function reset() {
                        canvasElement.width = canvasElement.width;
                    }

                    //function showimg(e =>{
                    //    handleMouseOut(e);
                    //});

                    function draw(centerX, centerY,
                        currentX, currentY, rotate) {

                        reset();

                       

                        var sizeX = 2 * (currentX - centerX);
                        var sizeY = 2 * (currentY - centerY);

                        ctx.strokeRect(centerX, centerY,currentX, currentY);
                        //ctx.rect(centerX - 0.5 * sizeX,
                        //    centerY - 0.5 * sizeY,
                        //    sizeX, sizeY);
                        ctx.lineWidth = 1;
                        // color
                        ctx.strokeStyle = '#fff';
                        // draw it
                       // ctx.stroke();
                    }
                }
            };
        });
}());
