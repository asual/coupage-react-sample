/*
 * Copyright (c) 2020-2021 Rostislav Hristov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const createLoadingElement = (nonce?: string) => {
    const style = document.createElement("style");
    if (nonce) {
        style.setAttribute("nonce", nonce);
    }
    style.textContent = `
        @keyframes circular-dash {
            0% {
                stroke-dasharray: 1px, 200px;
                stroke-dashoffset: 0px;
            }
            50% {
                stroke-dasharray: 100px, 200px;
                stroke-dashoffset: -15px;
            }
            100% {
                stroke-dasharray: 100px, 200px;
                stroke-dashoffset: -125px;
            }
        }
        @keyframes rotate {
            0% {
                transform-origin: 50% 50%;
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .spinner {
            animation: rotate 1.4s linear infinite;
            color: #3f51b5;
            display: inline-block;
            height: 40px;
            width: 40px;
        }
        .spinner-container {
            display: flex;
            position: absolute;
            padding: 12px;
            z-index: 9999;
        }
        .spinner-content {
            animation: circular-dash 1.4s ease-in-out infinite;
            stroke: currentColor;
            strokeDasharray: 80px, 200px;
            strokeDashoffset: 0;
        }
    `;
    document.head.appendChild(style);
    return (
        <div className="spinner-container">
            <div className="spinner">
                <svg viewBox="22 22 44 44">
                    <circle className="spinner-content" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
                </svg>
            </div>
        </div>
    );
};
