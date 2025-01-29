// Function for Text to Voice Announcement
    function makeAnnouncement() {
        const text = document.getElementById('announcementText').value.trim();
        if (text === "") {
            alert("Please enter text to announce.");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    }

    // Function for Image to Text
    function processImageToText() {
        const imageInput = document.getElementById('imageInput');
        const extractedTextElem = document.getElementById('extractedText');

        if (!imageInput.files || imageInput.files.length === 0) {
            alert("Please select an image file.");
            return;
        }

        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            const imageData = reader.result;

            // Using Tesseract.js for OCR
            Tesseract.recognize(imageData, 'eng', {
                logger: info => console.log(info) // Logs progress in the console
            }).then(({ data: { text } }) => {
                extractedTextElem.innerText = text.trim() || "No text detected in the image.";
            }).catch(error => {
                console.error(error);
                extractedTextElem.innerText = "Error: Unable to process the image.";
            });
        };

        reader.readAsDataURL(file);
    }

    // Function to display sections
    function showSection(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Function for Voice to Text
    function startVoiceRecognition() {
        const voiceOutputElem = document.getElementById('voiceOutput');

        // Check browser support for SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceOutputElem.innerText = "Speech recognition is not supported in your browser.";
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false; // Only return final results
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onstart = function () {
            voiceOutputElem.innerText = "Listening...";
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            voiceOutputElem.innerText = `Recognized Text: ${transcript}`;
        };

        recognition.onerror = function (event) {
            voiceOutputElem.innerText = `Error: ${event.error}`;
        };
    }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addCloseButton(myNodelist[i]);
}

// Function to add a close button to a list item
function addCloseButton(item) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    item.appendChild(span);

    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

// Click on a close button to hide the current list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    addCloseButton(li);
}
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { month: 'Jan', onTime: 92, late: 8, absent: 2 },
  { month: 'Feb', onTime: 88, late: 10, absent: 2 },
  { month: 'Mar', onTime: 95, late: 4, absent: 1 },
  { month: 'Apr', onTime: 90, late: 7, absent: 3 },
  { month: 'May', onTime: 93, late: 6, absent: 1 },
  { month: 'Jun', onTime: 91, late: 8, absent: 1 },
];

const overtimeData = [
  { month: 'Jan', Security: 45, Maintenance: 30, Cleaning: 20, Ticketing: 15 },
  { month: 'Feb', Security: 40, Maintenance: 35, Cleaning: 25, Ticketing: 20 },
  { month: 'Mar', Security: 50, Maintenance: 25, Cleaning: 30, Ticketing: 10 },
  { month: 'Apr', Security: 35, Maintenance: 40, Cleaning: 15, Ticketing: 25 },
  { month: 'May', Security: 45, Maintenance: 30, Cleaning: 20, Ticketing: 15 },
  { month: 'Jun', Security: 55, Maintenance: 20, Cleaning: 25, Ticketing: 20 },
];

const taskCompletionData = [
  { name: 'Completed', value: 75 },
  { name: 'In Progress', value: 15 },
  { name: 'Pending', value: 10 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

const ReportsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Overview of station operations and staff performance</p>
        </div>
        <select 
          className="border rounded-md p-2"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Staff Attendance</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Overtime Hours</p>
                <p className="text-2xl font-bold">185h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Understaffed Shifts</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Task Completion</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart width={500} height={300} data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" fill="#10B981" name="On Time" />
                <Bar dataKey="late" fill="#F59E0B" name="Late" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        {/* Overtime Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overtime Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart width={500} height={300} data={overtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Security" stroke="#3B82F6" />
                <Line type="monotone" dataKey="Maintenance" stroke="#10B981" />
                <Line type="monotone" dataKey="Cleaning" stroke="#F59E0B" />
                <Line type="monotone" dataKey="Ticketing" stroke="#8B5CF6" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        {/* Task Completion Status */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={taskCompletionData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Report Type</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Monthly Attendance</td>
                    <td className="p-2">Jan 25, 2025</td>
                    <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Complete</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Overtime Analysis</td>
                    <td className="p-2">Jan 24, 2025</td>
                    <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Complete</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Staff Performance</td>
                    <td className="p-2">Jan 23, 2025</td>
                    <td className="p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsDashboard;