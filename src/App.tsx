import React, { useState, useEffect } from 'react';
import { SecretaryServicePortal } from './SecretaryServicePortal';
import { supabase } from './supabase';
import { LayoutDashboard, Building2, Users, Handshake, Package, Warehouse, FileText, Truck, CreditCard, Smartphone, BarChart3, Settings, LogOut } from 'lucide-react';

export const App = () => {
  const [page, setPage] = useState('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [lang, setLang] = useState('en');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Branches
  const [branches, setBranches] = useState<any[]>([]);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editIsHQ, setEditIsHQ] = useState(false);
  const [branchStaff, setBranchStaff] = useState<any>({});
  const [expandedBranch, setExpandedBranch] = useState<number | null>(null);
  const [newBranchPhone, setNewBranchPhone] = useState('');
  const [newBranchIsHQ, setNewBranchIsHQ] = useState(false);

  // Staff
  const [staff, setStaff] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  const [newStaffBranch, setNewStaffBranch] = useState('');
  const [newStaffStatus, setNewStaffStatus] = useState('Active');
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [editStaffName, setEditStaffName] = useState('');
  const [editStaffEmail, setEditStaffEmail] = useState('');
  const [editStaffPhone, setEditStaffPhone] = useState('');
  const [editStaffRole, setEditStaffRole] = useState('');
  const [editStaffBranch, setEditStaffBranch] = useState('');
  const [editStaffStatus, setEditStaffStatus] = useState('Active');

  // Customers
const [customers, setCustomers] = useState<any[]>([]);
const [loadingCustomers, setLoadingCustomers] = useState(false);
const [newCustName, setNewCustName] = useState('');
const [newCustType, setNewCustType] = useState('');
const [newCustPhone, setNewCustPhone] = useState('');
const [newCustEmail, setNewCustEmail] = useState('');
const [newCustAddress, setNewCustAddress] = useState('');
const [newCustBranch, setNewCustBranch] = useState('');
const [newCustDiscount, setNewCustDiscount] = useState('0');
const [editingCustomer, setEditingCustomer] = useState<any>(null);
const [editCustName, setEditCustName] = useState('');
const [editCustType, setEditCustType] = useState('');
const [editCustPhone, setEditCustPhone] = useState('');
const [editCustEmail, setEditCustEmail] = useState('');
const [editCustAddress, setEditCustAddress] = useState('');
const [editCustBranch, setEditCustBranch] = useState('');
const [editCustDiscount, setEditCustDiscount] = useState('0');
const [custSearch, setCustSearch] = useState('');
const [custTypeFilter, setCustTypeFilter] = useState('');

// Orders
const [orders, setOrders] = useState<any[]>([]);
const [loadingOrders, setLoadingOrders] = useState(false);
const [showNewOrder, setShowNewOrder] = useState(false);
const [custDropdownSearch, setCustDropdownSearch] = useState('');
const [showCustDropdown, setShowCustDropdown] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState('');
const [orderNotes, setOrderNotes] = useState('');
const [orderItems, setOrderItems] = useState<any[]>([]);
const [draftItemType, setDraftItemType] = useState('stock');
const [draftOnHand, setDraftOnHand] = useState<number | null>(null);
const [draftOriginalPrice, setDraftOriginalPrice] = useState<number | null>(null);
const [draftProductId, setDraftProductId] = useState('');
const [draftItemName, setDraftItemName] = useState('');
const [draftCategory, setDraftCategory] = useState('');
const [draftQty, setDraftQty] = useState('1');
const [draftPrice, setDraftPrice] = useState('0');
const [draftDiscount, setDraftDiscount] = useState('0');
const [prodDropdownSearch, setProdDropdownSearch] = useState('');
const [showProdDropdown, setShowProdDropdown] = useState(false);
const [products, setProducts] = useState<any[]>([]);
const [orderSearch, setOrderSearch] = useState('');
const [orderStatusFilter, setOrderStatusFilter] = useState('');
const [viewingOrder, setViewingOrder] = useState<any>(null);
const [orderBranch, setOrderBranch] = useState('');
const [draftSaving, setDraftSaving] = useState(false);
const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
const [editingItemTempId, setEditingItemTempId] = useState<number | null>(null);
const [expandedCustOrders, setExpandedCustOrders] = useState<Record<string, boolean>>({});

// Stock
const [stockTab, setStockTab] = useState('onhand');
const [stockMovements, setStockMovements] = useState<any[]>([]);
const [loadingStock, setLoadingStock] = useState(false);
const [stockModalType, setStockModalType] = useState(''); // 'in' | 'out' | 'expired' | 'damaged' | ''
const [stkProduct, setStkProduct] = useState('');
const [stkQty, setStkQty] = useState('');
const [stkBranch, setStkBranch] = useState('');
const [stkReference, setStkReference] = useState('');
const [stkNotes, setStkNotes] = useState('');
const [stockSearch, setStockSearch] = useState('');
const [issueQty, setIssueQty] = useState<any>({});
const [issuing, setIssuing] = useState(false);
const [showRegisterItem, setShowRegisterItem] = useState(false);
const [regItemName, setRegItemName] = useState('');
const [regItemCategory, setRegItemCategory] = useState('');
const [regItemUnit, setRegItemUnit] = useState('');
const [regItemType, setRegItemType] = useState('stock');
const [regItemPrice, setRegItemPrice] = useState('0');
const [registeringItem, setRegisteringItem] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<any>(null);
const [productModalMode, setProductModalMode] = useState<'menu' | 'edit'>('menu');
const [editProdName, setEditProdName] = useState('');
const [editProdCategory, setEditProdCategory] = useState('');
const [editProdUnit, setEditProdUnit] = useState('');
const [editProdType, setEditProdType] = useState('stock');
const [editProdPrice, setEditProdPrice] = useState('0');
const [savingProduct, setSavingProduct] = useState(false);
const [stkProductSearch, setStkProductSearch] = useState('');
const [showStkProdDropdown, setShowStkProdDropdown] = useState(false);
const [viewingRequestOrder, setViewingRequestOrder] = useState<any>(null);
const [reqItemSearch, setReqItemSearch] = useState('');
const [selectedIssueItemId, setSelectedIssueItemId] = useState<number | null>(null);
const [stockBranchFilter, setStockBranchFilter] = useState('');
const [stockRequests, setStockRequests] = useState<any[]>([]);
const [showNewTransfer, setShowNewTransfer] = useState(false);
const [trfProduct, setTrfProduct] = useState('');
const [trfQty, setTrfQty] = useState('');
const [trfToBranch, setTrfToBranch] = useState('');
const [trfFromBranch, setTrfFromBranch] = useState('');
const [trfTargetType, setTrfTargetType] = useState('branch');
const [trfTargetUser, setTrfTargetUser] = useState('');
const [trfOrderId, setTrfOrderId] = useState<number | null>(null);
const [trfNotes, setTrfNotes] = useState('');
const [stockMenuOpen, setStockMenuOpen] = useState(false);
const [editingMovement, setEditingMovement] = useState<any>(null);
const [editMvQty, setEditMvQty] = useState('');
const [editMvAdd, setEditMvAdd] = useState('');
const [editMvBranch, setEditMvBranch] = useState('');
const [editMvReference, setEditMvReference] = useState('');
const [editMvNotes, setEditMvNotes] = useState('');
const [savingMovement, setSavingMovement] = useState(false);
const [historyFor, setHistoryFor] = useState<any>(null);
const [historyRows, setHistoryRows] = useState<any[]>([]);

// Invoices
const [invoices, setInvoices] = useState<any[]>([]);
const [loadingInvoices, setLoadingInvoices] = useState(false);
const [viewingInvoice, setViewingInvoice] = useState<any>(null);
const [invoiceSearch, setInvoiceSearch] = useState('');
const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('');
const [creatingInvoiceFor, setCreatingInvoiceFor] = useState<any>(null);
const [invoiceTax, setInvoiceTax] = useState('0');
const [invoiceNotes, setInvoiceNotes] = useState('');

// Deliveries
const [deliveries, setDeliveries] = useState<any[]>([]);
const [loadingDeliveries, setLoadingDeliveries] = useState(false);
const [viewingDelivery, setViewingDelivery] = useState<any>(null);
const [deliverySearch, setDeliverySearch] = useState('');
const [creatingDeliveryFor, setCreatingDeliveryFor] = useState<any>(null);
const [deliveryItems, setDeliveryItems] = useState<any[]>([]);
const [deliveryNotes, setDeliveryNotes] = useState('');
const [receivedByCustomer, setReceivedByCustomer] = useState('');

// Payments
const [payments, setPayments] = useState<any[]>([]);
const [loadingPayments, setLoadingPayments] = useState(false);
const [showNewPayment, setShowNewPayment] = useState(false);
const [paymentInvoiceId, setPaymentInvoiceId] = useState('');
const [paymentAmount, setPaymentAmount] = useState('');
const [paymentMethod, setPaymentMethod] = useState('cash');
const [paymentReference, setPaymentReference] = useState('');
const [paymentNotes, setPaymentNotes] = useState('');
const [paymentSearch, setPaymentSearch] = useState('');
const [paymentMethodFilter, setPaymentMethodFilter] = useState('');

// Wakala
const [wakalaTxns, setWakalaTxns] = useState<any[]>([]);
const [loadingWakala, setLoadingWakala] = useState(false);
const [showNewWakala, setShowNewWakala] = useState(false);
const [wkType, setWkType] = useState('deposit');
const [wkNetwork, setWkNetwork] = useState('');
const [wkCustName, setWkCustName] = useState('');
const [wkCustPhone, setWkCustPhone] = useState('');
const [wkAmount, setWkAmount] = useState('');
const [wkCommission, setWkCommission] = useState('');
const [wkReference, setWkReference] = useState('');
const [wkNotes, setWkNotes] = useState('');
const [wkBranch, setWkBranch] = useState('');
const [wkSearch, setWkSearch] = useState('');
const [wkTypeFilter, setWkTypeFilter] = useState('');
const [viewingWakala, setViewingWakala] = useState<any>(null);
const [wakalaSummary, setWakalaSummary] = useState<any>({});

// Reports
const [reportPeriod, setReportPeriod] = useState('month');
const [reportBranch, setReportBranch] = useState('');

// Settings
const [companyName, setCompanyName] = useState('Joleo Company Limited');
const [companyPhone, setCompanyPhone] = useState('');
const [companyEmail, setCompanyEmail] = useState('');
const [companyAddress, setCompanyAddress] = useState('');
const [savingSettings, setSavingSettings] = useState(false);
const [settingsTab, setSettingsTab] = useState('company');
const [newUserEmail, setNewUserEmail] = useState('');
const [newUserPassword, setNewUserPassword] = useState('');
const [newUserName, setNewUserName] = useState('');
const [newUserRole, setNewUserRole] = useState('');
const [newUserBranch, setNewUserBranch] = useState('');
const [newUserIsDirector, setNewUserIsDirector] = useState(false);
const [creatingUser, setCreatingUser] = useState(false);
const [staffAccountSearch, setStaffAccountSearch] = useState('');
const [selectedStaffAccount, setSelectedStaffAccount] = useState<any>(null);
const [authUsers, setAuthUsers] = useState<any[]>([]);

async function fetchCompanySettings() {
  const { data } = await supabase
    .from('company_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (data) {
    setCompanyName(data.company_name || 'Joleo Company Limited');
    setCompanyPhone(data.phone || '');
    setCompanyEmail(data.email || '');
    setCompanyAddress(data.address || '');
  }
}

async function saveCompanySettings() {
  setSavingSettings(true);
  const { error } = await supabase.from('company_settings').upsert({
    id: 1,
    company_name: companyName,
    phone: companyPhone,
    email: companyEmail,
    address: companyAddress,
    updated_at: new Date().toISOString()
  });
  setSavingSettings(false);
  if (error) alert('Error: ' + error.message);
  else alert(lang === 'en' ? 'Settings saved!' : 'Mipangilio imehifadhiwa!');
}

  // ---------- Branches functions ----------
  async function fetchBranches() {
    setLoadingBranches(true);
    const { data, error } = await supabase.from('branches').select('*').order('id', { ascending: false });
    if (!error) setBranches(data || []);
    setLoadingBranches(false);
  }

  async function clearOtherHQ(exceptId: number) {
  await supabase.from('branches').update({ is_headquarter: false }).neq('id', exceptId);
}

async function addBranch() {
  if (!newBranchName.trim()) {
    alert(lang === 'en' ? 'Branch name is required' : 'Jina la tawi linahitajika');
    return;
  }
  const { data, error } = await supabase.from('branches').insert([{
    name: newBranchName,
    location: newBranchLocation,
    phone: newBranchPhone,
    is_headquarter: newBranchIsHQ,
    is_active: true
  }]).select().single();

  if (!error) {
    if (newBranchIsHQ && data) {
      await clearOtherHQ(data.id);
    }
    setNewBranchName('');
    setNewBranchLocation('');
    setNewBranchPhone('');
    setNewBranchIsHQ(false);
    fetchBranches();
  } else {
    alert('Error: ' + error.message);
  }
}

  async function deleteBranch(id: number) {
    await supabase.from('branches').delete().eq('id', id);
    fetchBranches();
  }

  async function fetchBranchStaff(branchId: number) {
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, email, role_id, roles(name)')
      .eq('branch_id', branchId);
    if (!error) setBranchStaff((prev: any) => ({ ...prev, [branchId]: data || [] }));
  }

    function toggleBranchExpansion(branchId: number) {
    if (expandedBranch === branchId) {
      setExpandedBranch(null);
    } else {
      setExpandedBranch(branchId);
      fetchBranchStaff(branchId);
    }
  }
  
  async function updateBranch(id: number) {
  const { error } = await supabase.from('branches').update({
    name: editName,
    location: editLocation,
    phone: editPhone,
    is_headquarter: editIsHQ
  }).eq('id', id);
  if (!error) {
    if (editIsHQ) await clearOtherHQ(id);
    setEditingBranch(null);
    fetchBranches();
  } else {
    alert('Error: ' + error.message);
  }
}

  // ---------- Staff functions ----------
  async function fetchRoles() {
    const { data, error } = await supabase.from('roles').select('*').order('id');
    if (!error) setRoles(data || []);
  }

  async function fetchStaff() {
    setLoadingStaff(true);
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, email, phone, role_id, branch_id, status, is_active, roles(name), branches(name)')
      .order('id', { ascending: false });
    if (!error) setStaff(data || []);
    setLoadingStaff(false);
  }

  async function addStaff() {
  if (!newStaffName.trim() || !newStaffRole || !newStaffBranch) return;
  const { error } = await supabase.from('users').insert([{
    full_name: newStaffName, email: newStaffEmail, phone: newStaffPhone,
    role_id: newStaffRole, branch_id: newStaffBranch, status: newStaffStatus, is_active: true
  }]);
  if (!error) {
    setNewStaffName(''); setNewStaffEmail(''); setNewStaffPhone('');
    setNewStaffRole(''); setNewStaffBranch(''); setNewStaffStatus('Active'); fetchStaff();
  }
}

  async function deleteStaff(id: number) {
    await supabase.from('users').delete().eq('id', id);
    fetchStaff();
  }

 async function updateStaff(id: number) {
  const { error } = await supabase.from('users').update({
    full_name: editStaffName, email: editStaffEmail, phone: editStaffPhone,
    role_id: editStaffRole, branch_id: editStaffBranch, status: editStaffStatus
  }).eq('id', id);
  if (!error) { setEditingStaff(null); fetchStaff(); }
}

  useEffect(() => {
  if (page === 'branches' || page === 'dashboard') fetchBranches();
  if (page === 'dashboard') {
    fetchOrders();
    fetchPayments();
    fetchStaff();
    fetchInvoices();
  }
  if (page === 'staff') {
    fetchStaff(); fetchRoles();
    if (branches.length === 0) fetchBranches();
  }
  if (page === 'customers') {
    fetchCustomers();
    if (branches.length === 0) fetchBranches();
  }
  if (page === 'orders') {
  fetchOrders(); fetchProducts();
  fetchInvoices(); fetchPayments();   // <-- ongeza
  if (customers.length === 0) fetchCustomers();
  if (branches.length === 0) fetchBranches();
  if (stockMovements.length === 0) fetchStockMovements();
}
  if (page === 'stock') {
  fetchStockMovements();
  fetchOrders();
  if (products.length === 0) fetchProducts();
  if (branches.length === 0) fetchBranches();
  fetchStockRequests();
  if (staff.length === 0) fetchStaff();
}
  if (page === 'invoices') {
  fetchInvoices();
  fetchDeliveries();           
  if (orders.length === 0) fetchOrders();
  if (customers.length === 0) fetchCustomers();
}
if (page === 'deliveries') {
  fetchDeliveries();
  fetchInvoices();             
  if (orders.length === 0) fetchOrders();
  if (customers.length === 0) fetchCustomers();
}
  if (page === 'payments') {
    fetchPayments();
    if (invoices.length === 0) fetchInvoices();
    if (branches.length === 0) fetchBranches();
  }
  if (page === 'wakala') {
    fetchWakala();
    if (branches.length === 0) fetchBranches();
  }
  if (page === 'reports') {
    fetchOrders(); fetchInvoices();
    fetchPayments(); fetchCustomers();
    fetchDeliveries(); fetchWakala();
    if (branches.length === 0) fetchBranches();
    if (staff.length === 0) fetchStaff();
  }
  if (page === 'settings') {
    fetchRoles();
    if (branches.length === 0) fetchBranches();
    if (staff.length === 0) fetchStaff();
    fetchCompanySettings();   // <-- ongeza
    fetchRoles();
  }
}, [page]);

// Auto-save order draft kila baada ya sekunde 8, wakati New Order modal ikiwa wazi
useEffect(() => {
  if (!showNewOrder || editingOrderId) return;

  const hasContent = selectedCustomer || orderBranch || orderItems.length > 0 || orderNotes.trim();
  if (!hasContent) return;

  const timer = setInterval(() => {
    saveOrderDraft(true);
  }, 8000);

  return () => clearInterval(timer);
}, [showNewOrder, editingOrderId, selectedCustomer, orderBranch, orderItems, orderNotes]);

      async function handleLogin() {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(lang === 'en' ? 'Invalid email or password' : 'Barua pepe au nywila si sahihi');
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, full_name, email, role_id, branch_id, roles(name), branches(name)')
      .eq('email', email)
      .maybeSingle();

    if (userError || !userData) {
      setError(lang === 'en' ? 'Login succeeded but no staff profile is linked to this email' : 'Umeingia lakini akaunti hii haijaunganishwa na taarifa za mfanyakazi');
      setLoading(false);
      return;
    }

    setCurrentUser({
      id: userData.id,
      full_name: userData.full_name,
      email: userData.email,
      role_id: userData.role_id,
      role_name: (userData.roles as any)?.name || '',
      branch_id: userData.branch_id,
      branch_name: (userData.branches as any)?.name || '',
    });

    setPage('dashboard');
    const isStoreKeeper = (userData.roles as any)?.name === 'Store Keeper';
if (isStoreKeeper) setStockTab('requests');
setPage(isStoreKeeper ? 'stock' : 'dashboard');
    setLoading(false);
  }

  // Store keeper anapata orders mpya papo hapo
useEffect(() => {
  if (!currentUser) return;
  fetchOrders();
  if (products.length === 0) fetchProducts();
  fetchStockMovements();

  const channel = supabase
    .channel('orders-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => { fetchOrders(); })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, () => { fetchOrders(); })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'order_changes' }, () => { fetchOrders(); })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [currentUser]);

  // ---------- Customers functions ----------
async function fetchCustomers() {
  setLoadingCustomers(true);
  const { data, error } = await supabase
    .from('customers')
    .select('*, branches(name)')
    .order('id', { ascending: false });
  if (!error) setCustomers(data || []);
  setLoadingCustomers(false);
}

async function addCustomer() {
  if (!newCustName.trim() || !newCustType || !newCustBranch) {
    alert(lang === 'en' ? 'Name, type and branch are required' : 'Jina, aina na tawi vinahitajika');
    return;
  }
  const { error } = await supabase.from('customers').insert([{
    name: newCustName,
    type: newCustType,
    phone: newCustPhone,
    email: newCustEmail,
    address: newCustAddress,
    branch_id: newCustBranch,
    discount_rate: parseFloat(newCustDiscount) || 0,
    served_by_id: currentUser?.id || null,
    served_by_name: currentUser?.full_name || null,
    is_active: true
  }]);
  if (!error) {
    setNewCustName(''); setNewCustType(''); setNewCustPhone('');
    setNewCustEmail(''); setNewCustAddress('');
    setNewCustBranch(''); setNewCustDiscount('0');
    fetchCustomers();
  } else {
    alert('Error: ' + error.message);
  }
}

async function updateCustomer(id: number) {
  const { error } = await supabase.from('customers').update({
    name: editCustName, type: editCustType, phone: editCustPhone,
    email: editCustEmail, address: editCustAddress,
    branch_id: editCustBranch, discount_rate: parseFloat(editCustDiscount) || 0
  }).eq('id', id);
  if (!error) { setEditingCustomer(null); fetchCustomers(); }
}

async function deleteCustomer(id: number) {
  if (!window.confirm(lang === 'en' ? 'Delete this customer?' : 'Futa mteja huyu?')) return;
  await supabase.from('customers').delete().eq('id', id);
  fetchCustomers();
}

// ---------- Orders functions ----------
async function fetchProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, stock(*)')
    .eq('is_active', true)
    .order('name');
  setProducts(data || []);
}

async function fetchOrders() {
  setLoadingOrders(true);
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers(name, type),
  branches(name),
  order_items(*, products(name, unit)),
  order_changes(*)
`)
    .order('id', { ascending: false });
  if (!error) setOrders(data || []);
  setLoadingOrders(false);
}

function hasUnackChanges(o: any) {
  return (o.order_changes || []).some((c: any) => !c.acknowledged);
}

function renderOrderRow(o: any, child: boolean = false) {
  const statusColors: any = {
    received: {bg:'#dbeafe',color:'#1d4ed8'},
    processing: {bg:'#fef9c3',color:'#854d0e'},
    pending: {bg:'#fee2e2',color:'#dc2626'},
    ready: {bg:'#d1fae5',color:'#065f46'},
    dispatched: {bg:'#e0e7ff',color:'#3730a3'},
    completed: {bg:'#dcfce7',color:'#15803d'},
    cancelled: {bg:'#f3f4f6',color:'#6b7280'},
  };
  const sc = statusColors[o.status] || {bg:'#f3f4f6',color:'#666'};
  const statusLabels: any = {
    received: lang==='en'?'Received':'Imepokelewa',
    processing: lang==='en'?'Processing':'Inashughulikiwa',
    pending: lang==='en'?'Pending':'Inasubiri',
    ready: lang==='en'?'Ready':'Tayari',
    dispatched: lang==='en'?'Dispatched':'Imetumwa',
    completed: lang==='en'?'Completed':'Imekamilika',
    cancelled: lang==='en'?'Cancelled':'Imefutwa',
  };
  return (
    <tr key={o.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px',background: child ? '#f9fafb' : 'white'}}>
      <td style={{padding:'10px 8px',paddingLeft: child ? '32px' : '8px'}}>
        <span style={{fontWeight:'700',color:'#0a1628',fontFamily:'monospace'}}>{o.order_number}</span>
      </td>
      <td style={{padding:'10px 8px'}}>
        <div style={{fontWeight:'600'}}>{o.customers?.name}</div>
        <div style={{fontSize:'12px',color:'#666'}}>{o.customers?.type}</div>
      </td>
      <td style={{padding:'10px 8px'}}>{o.branches?.name || '-'}</td>
      <td style={{padding:'10px 8px'}}>
        <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
          {o.order_items?.length || 0} {lang==='en'?'items':'bidhaa'}
        </span>
      </td>
      <td style={{padding:'10px 8px',fontWeight:'600'}}>TSh {(o.total_amount||0).toLocaleString()}</td>
      <td style={{padding:'10px 8px'}}>
        <select value={o.status} onChange={e=>updateOrderStatus(o.id, e.target.value)}
          style={{background:sc.bg,color:sc.color,border:'none',borderRadius:'12px',padding:'4px 8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          {Object.entries(statusLabels).map(([k,v])=>(
            <option key={k} value={k}>{v as string}</option>
          ))}
        </select>
      </td>
      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>{new Date(o.created_at).toLocaleDateString()}</td>
      <td style={{padding:'10px 8px'}}>
        <button onClick={()=>setViewingOrder(o)} style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px',marginRight:'8px'}}>
          {lang==='en'?'View':'Ona'}
        </button>
        <button onClick={()=>openEditOrder(o)} style={{background:'none',border:'none',color:'#c9a84c',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
          {lang==='en'?'Edit':'Hariri'}
        </button>
      </td>
    </tr>
  );
}

function isActiveRequest(o: any) {
  if (['completed', 'cancelled'].includes(o.status)) return false;
  return ['received', 'processing', 'pending'].includes(o.status) || hasUnackChanges(o);
}

async function acknowledgeChanges(orderId: number) {
  await supabase.from('order_changes').update({
    acknowledged: true,
    acknowledged_by_name: currentUser?.full_name || null,
    acknowledged_at: new Date().toISOString()
  }).eq('order_id', orderId).eq('acknowledged', false);
  fetchOrders();
}

function addOrderItem() {
  setOrderItems(prev => [...prev, {
    tempId: Date.now(),
    product_id: '',
    item_name: '',
    item_type: 'stock',
    quantity_requested: 1,
    unit_price: 0,
    discount: 0,
    category: ''
  }]);
}

function selectDraftProduct(product: any) {
  setDraftProductId(String(product.id));
  setDraftItemName(product.name);
  setDraftPrice(String(product.unit_price || 0));
  setDraftOriginalPrice(product.unit_price || 0);
  setDraftCategory(product.category || '');
  setDraftItemType(product.item_type || 'stock');
  setDraftOnHand(typeof product.onHand === 'number' ? product.onHand : null);
  setDraftDiscount('0');
  setProdDropdownSearch('');
  setShowProdDropdown(false);
}

function handleDraftPriceChange(value: string) {
  setDraftPrice(value);
  if (draftOriginalPrice && draftOriginalPrice > 0) {
    const entered = parseFloat(value) || 0;
    const diff = draftOriginalPrice - entered;
    const pct = (diff / draftOriginalPrice) * 100;
    setDraftDiscount(pct > 0 ? pct.toFixed(1) : '0');
  }
}

function openEditOrder(order: any) {
  if (['completed', 'cancelled'].includes(order.status)) {
    alert(lang === 'en' ? 'Cannot edit a completed or cancelled order' : 'Haiwezi kuhaririwa: order imekamilika au imefutwa');
    return;
  }
  setEditingOrderId(order.id);
  setSelectedCustomer(String(order.customer_id));
  setOrderBranch(String(order.branch_id));
  setOrderNotes(order.notes || '');
  setOrderItems((order.order_items || []).map((item: any) => ({
    tempId: item.id,
    dbId: item.id,                                  // <-- inatambulisha item iliyopo kwenye DB
    quantity_supplied: item.quantity_supplied || 0, // <-- kwa ulinzi
    product_id: item.product_id || '',
    item_name: item.item_name,
    item_type: item.item_type,
    quantity_requested: item.quantity_requested,
    unit_price: item.unit_price,
    discount: item.discount || 0,
    category: ''
  })));
  setEditingItemTempId(null);
  setShowNewOrder(true);
}

function startEditItem(item: any) {
  setEditingItemTempId(item.tempId);
  setDraftItemType(item.item_type);
  setDraftProductId(item.product_id ? String(item.product_id) : '');
  setDraftItemName(item.item_name);
  setDraftQty(String(item.quantity_requested));
  setDraftPrice(String(item.unit_price));
  setDraftDiscount(String(item.discount || 0));
  setDraftCategory(item.category || '');
  if (item.item_type === 'stock' && item.product_id) {
    const stockData = computeStockBalance().find((p: any) => p.id === item.product_id);
    if (stockData) {
      setDraftOnHand(stockData.onHand);
      setDraftOriginalPrice(stockData.unit_price || 0);
    }
  } else {
    setDraftOnHand(null);
    setDraftOriginalPrice(null);
  }
  setProdDropdownSearch('');
  setShowProdDropdown(false);
}

function cancelEditItem() {
  setEditingItemTempId(null);
  setDraftItemType('stock');
  setDraftProductId('');
  setDraftItemName('');
  setDraftCategory('');
  setDraftOnHand(null);
  setDraftOriginalPrice(null);
  setDraftQty('1');
  setDraftPrice('0');
  setDraftDiscount('0');
  setProdDropdownSearch('');
  setShowProdDropdown(false);
}

function addItemFromDraft() {
  if (draftItemType === 'stock' && !draftProductId) {
    alert(lang==='en' ? 'Please select a product' : 'Tafadhali chagua bidhaa');
    return;
  }
  if (draftItemType === 'special' && !draftItemName.trim()) {
    alert(lang==='en' ? 'Please enter item name' : 'Tafadhali andika jina la bidhaa');
    return;
  }
  if (!draftQty || parseFloat(draftQty) <= 0) {
    alert(lang==='en' ? 'Enter a valid quantity' : 'Weka idadi sahihi');
    return;
  }

  const itemData = {
    product_id: draftProductId || '',
    item_name: draftItemName,
    item_type: draftItemType,
    quantity_requested: parseFloat(draftQty),
    unit_price: parseFloat(draftPrice) || 0,
    discount: parseFloat(draftDiscount) || 0,
    category: draftCategory
  };

  if (editingItemTempId !== null) {
  const existing = orderItems.find(it => it.tempId === editingItemTempId);
  if (existing && parseFloat(draftQty) < (existing.quantity_supplied || 0)) {
    alert(lang === 'en'
      ? `Quantity cannot be below issued amount (${existing.quantity_supplied})`
      : `Idadi haiwezi kuwa chini ya iliyotolewa (${existing.quantity_supplied})`);
    return;
  }
  setOrderItems(prev => prev.map(it => it.tempId === editingItemTempId ? { ...it, ...itemData } : it));
} else {
  setOrderItems(prev => [...prev, { tempId: Date.now(), ...itemData }]);
}

  cancelEditItem();
}

function saveOrderDraft(silent: boolean = false) {
  if (!silent) setDraftSaving(true);
  const draft = {
    selectedCustomer,
    orderBranch,
    orderNotes,
    orderItems,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem('joleo_order_draft', JSON.stringify(draft));
    setDraftSavedAt(draft.savedAt);
  } catch (e) {
    console.error('Draft save failed', e);
  }
  if (!silent) setTimeout(() => setDraftSaving(false), 400);
}

function loadOrderDraft() {
  try {
    const raw = localStorage.getItem('joleo_order_draft');
    if (!raw) return;
    const draft = JSON.parse(raw);
    const hasContent = draft.selectedCustomer || draft.orderBranch || (draft.orderItems && draft.orderItems.length > 0) || draft.orderNotes;
    if (!hasContent) return;
    const confirmed = window.confirm(
      lang === 'en'
        ? `A saved draft was found (${new Date(draft.savedAt).toLocaleString()}). Load it?`
        : `Umepata order iliyohifadhiwa (${new Date(draft.savedAt).toLocaleString()}). Uipakue?`
    );
    if (confirmed) {
      setSelectedCustomer(draft.selectedCustomer || '');
      setOrderBranch(draft.orderBranch || '');
      setOrderNotes(draft.orderNotes || '');
      setOrderItems(draft.orderItems || []);
      setDraftSavedAt(draft.savedAt);
    }
  } catch (e) {
    console.error('Draft load failed', e);
  }
}

function clearOrderDraft() {
  localStorage.removeItem('joleo_order_draft');
  setDraftSavedAt(null);
}

function removeOrderItem(tempId: number) {
  const item = orderItems.find(i => i.tempId === tempId);
  if (item && (item.quantity_supplied || 0) > 0) {
    alert(lang === 'en'
      ? `Cannot remove: ${item.quantity_supplied} already issued. Reduce quantity instead, or record a Stock In for returns.`
      : `Haiwezi kuondolewa: ${item.quantity_supplied} tayari zimetolewa. Punguza idadi, au rekodi Stock In kama mzigo umerudishwa.`);
    return;
  }
  setOrderItems(prev => prev.filter(i => i.tempId !== tempId));
}

function updateOrderItem(tempId: number, field: string, value: any) {
  setOrderItems(prev => prev.map(item => {
    if (item.tempId !== tempId) return item;
    if (field === 'product_id' && value) {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        return {
          ...item,
          product_id: value,
          item_name: product.name,
          unit_price: product.unit_price || 0,
          category: product.category || '',
          item_type: product.item_type || 'stock'
        };
      }
    }
    return { ...item, [field]: value };
  }));
}

async function submitOrder() {
  if (!selectedCustomer || !orderBranch || orderItems.length === 0) {
    alert(lang === 'en' 
      ? 'Please select customer, branch and add at least one item' 
      : 'Tafadhali chagua mteja, tawi na ongeza bidhaa angalau moja');
    return;
  }

  const totalAmount = orderItems.reduce((sum, item) => {
    const subtotal = item.quantity_requested * item.unit_price;
    const disc = subtotal * (item.discount / 100);
    return sum + (subtotal - disc);
  }, 0);

  if (editingOrderId) {
  const original = orders.find(o => o.id === editingOrderId);
  const oldItems: any[] = original?.order_items || [];
  const who = currentUser?.full_name || null;
  const changes: any[] = [];
  const log = (type: string, name: string, oldV: any, newV: any) =>
    changes.push({ order_id: editingOrderId, change_type: type, item_name: name,
      old_value: String(oldV), new_value: String(newV), changed_by_name: who });

  // 1) Zilizoondolewa (zile ambazo hazijatolewa tu)
  for (const old of oldItems) {
    const still = orderItems.find(i => i.dbId === old.id);
    if (!still && (old.quantity_supplied || 0) === 0) {
      const { error } = await supabase.from('order_items').delete().eq('id', old.id);
      if (error) { alert('Error: ' + error.message); return; }
      log('removed', old.item_name, old.quantity_requested, 0);
    }
  }

  // 2) Zilizobadilishwa au kuongezwa
  for (const it of orderItems) {
    const qty = parseInt(it.quantity_requested);
    const price = parseFloat(it.unit_price) || 0;
    const disc = parseFloat(it.discount) || 0;
    const total = qty * price * (1 - disc / 100);

    if (it.dbId) {
      const old = oldItems.find(o => o.id === it.dbId);
      if (!old) continue;
      const qtyChanged = Number(old.quantity_requested) !== qty;
      const priceChanged = Number(old.unit_price) !== price || Number(old.discount || 0) !== disc;
      if (!qtyChanged && !priceChanged) continue;

      const supplied = old.quantity_supplied || 0;
      const itemStatus = supplied >= qty ? 'supplied' : supplied > 0 ? 'partial' : 'pending';
      const { error } = await supabase.from('order_items').update({
        quantity_requested: qty, unit_price: price, discount: disc,
        total_price: total, status: itemStatus
      }).eq('id', it.dbId);
      if (error) { alert('Error: ' + error.message); return; }

      if (qtyChanged) log('qty_changed', old.item_name, old.quantity_requested, qty);
      if (priceChanged) log('price_changed', old.item_name, `${old.unit_price} (-${old.discount || 0}%)`, `${price} (-${disc}%)`);
    } else {
      const { error } = await supabase.from('order_items').insert([{
        order_id: editingOrderId,
        product_id: it.product_id || null,
        item_name: it.item_name,
        item_type: it.item_type,
        quantity_requested: qty,
        quantity_available: 0,
        quantity_supplied: 0,
        unit_price: price,
        discount: disc,
        total_price: total,
        status: 'pending'
      }]);
      if (error) { alert('Items error: ' + error.message); return; }
      log('added', it.item_name, 0, qty);
    }
  }

  // 3) Hesabu upya status ya order
  const { data: fresh } = await supabase
    .from('order_items').select('quantity_requested, quantity_supplied').eq('order_id', editingOrderId);
  const rows = fresh || [];
  const allDone = rows.length > 0 && rows.every((i: any) => (i.quantity_supplied || 0) >= i.quantity_requested);
  let newStatus = original?.status;
  if (changes.length > 0 && ['ready', 'processing'].includes(original?.status)) {
    newStatus = allDone ? 'ready' : 'processing';
  }

  const { error: orderError } = await supabase.from('orders').update({
    customer_id: selectedCustomer,
    branch_id: orderBranch,
    notes: orderNotes,
    total_amount: totalAmount,
    status: newStatus
  }).eq('id', editingOrderId);
  if (orderError) { alert('Error: ' + orderError.message); return; }

  // 4) Andika log ya mabadiliko (inaleta alert kwa store keeper)
  if (changes.length > 0) {
    await supabase.from('order_changes').insert(changes);
  }

  setShowNewOrder(false);
  setEditingOrderId(null);
  setEditingItemTempId(null);
  setSelectedCustomer('');
  setOrderBranch('');
  setOrderNotes('');
  setOrderItems([]);
  clearOrderDraft();
  fetchOrders();
  alert(lang === 'en' ? 'Order updated!' : 'Order imesasishwa!');
  return;
}

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      customer_id: selectedCustomer,
      branch_id: orderBranch,
      status: 'received',
      notes: orderNotes,
      total_amount: totalAmount
    }])
    .select()
    .single();

  if (orderError) {
    alert('Error: ' + orderError.message);
    return;
  }

  const itemsToInsert = orderItems.map(item => ({
    order_id: orderData.id,
    product_id: item.product_id || null,
    item_name: item.item_name,
    item_type: item.item_type,
    quantity_requested: parseInt(item.quantity_requested),
    quantity_available: 0,
    quantity_supplied: 0,
    unit_price: parseFloat(item.unit_price),
    discount: parseFloat(item.discount) || 0,
    total_price: (item.quantity_requested * item.unit_price) * (1 - (item.discount / 100)),
    status: 'pending'
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsToInsert);

  if (itemsError) {
    alert('Items error: ' + itemsError.message);
    return;
  }

  setShowNewOrder(false);
  setSelectedCustomer('');
  setOrderBranch('');
  setOrderNotes('');
  setOrderItems([]);
  clearOrderDraft();
  fetchOrders();
}

async function updateOrderStatus(orderId: number, status: string) {
  await supabase.from('orders').update({ status }).eq('id', orderId);
  fetchOrders();
  if (viewingOrder?.id === orderId) {
    setViewingOrder((prev: any) => ({ ...prev, status }));
  }
}

// ---------- Stock functions ----------
async function fetchStockMovements() {
  setLoadingStock(true);
  const { data, error } = await supabase
    .from('stock_movements')
    .select('*, products(name, category, item_type, unit), branches(name)')
    .order('id', { ascending: false });
  if (!error) setStockMovements(data || []);
  setLoadingStock(false);
}

async function registerItem() {
  const name = regItemName.trim();
  if (!name) {
    alert(lang === 'en' ? 'Item name is required' : 'Jina la bidhaa linahitajika');
    return;
  }

  // Zuia jina lililojirudia
  const exists = products.some(p => p.name.trim().toLowerCase() === name.toLowerCase());
  if (exists) {
    alert(lang === 'en' ? 'This item is already registered' : 'Bidhaa hii tayari imesajiliwa');
    return;
  }

  setRegisteringItem(true);
  const { error } = await supabase.from('products').insert([{
    name,
    category: regItemCategory.trim() || null,
    unit: regItemUnit.trim() || null,
    item_type: regItemType,
    unit_price: parseFloat(regItemPrice) || 0,
    is_active: true
  }]);
  setRegisteringItem(false);

  if (error) { alert('Error: ' + error.message); return; }

  setRegItemName(''); setRegItemCategory(''); setRegItemUnit('');
  setRegItemType('stock'); setRegItemPrice('0');
  setShowRegisterItem(false);
  fetchProducts();
  alert(lang === 'en' ? 'Item registered!' : 'Bidhaa imesajiliwa!');
}

function openProductMenu(p: any) {
  setSelectedProduct(p);
  setProductModalMode('menu');
  setEditProdName(p.name || '');
  setEditProdCategory(p.category || '');
  setEditProdUnit(p.unit || '');
  setEditProdType(p.item_type || 'stock');
  setEditProdPrice(String(p.unit_price || 0));
}

function closeProductModal() {
  setSelectedProduct(null);
  setProductModalMode('menu');
}

async function updateProduct() {
  if (!selectedProduct) return;
  const name = editProdName.trim();
  if (!name) {
    alert(lang === 'en' ? 'Item name is required' : 'Jina la bidhaa linahitajika');
    return;
  }
  const exists = products.some(p =>
    p.id !== selectedProduct.id && p.name.trim().toLowerCase() === name.toLowerCase()
  );
  if (exists) {
    alert(lang === 'en' ? 'Another item already has this name' : 'Bidhaa nyingine tayari ina jina hili');
    return;
  }

  setSavingProduct(true);
  const { error } = await supabase.from('products').update({
    name,
    category: editProdCategory.trim() || null,
    unit: editProdUnit.trim() || null,
    item_type: editProdType,
    unit_price: parseFloat(editProdPrice) || 0
  }).eq('id', selectedProduct.id);
  setSavingProduct(false);

  if (error) { alert('Error: ' + error.message); return; }
  closeProductModal();
  fetchProducts();
  fetchStockMovements();
}

async function deleteProduct() {
  if (!selectedProduct) return;
  const id = selectedProduct.id;

  // Angalia kama item ina historia
  const hasMovements = stockMovements.some(m => m.product_id === id);
  const { count: orderCount } = await supabase
    .from('order_items')
    .select('id', { count: 'exact', head: true })
    .eq('product_id', id);
  const hasHistory = hasMovements || (orderCount || 0) > 0;

  if (!hasHistory) {
    // Haina historia yoyote: futa kabisa
    if (!window.confirm(lang === 'en'
      ? `Delete "${selectedProduct.name}" permanently?`
      : `Futa "${selectedProduct.name}" kabisa?`)) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { alert('Error: ' + error.message); return; }
  } else {
    // Ina historia (stock movements / orders): ficha tu, historia isiharibike
    if (!window.confirm(lang === 'en'
      ? `"${selectedProduct.name}" has stock/order history, so it will be removed from the system lists but old records stay intact. Continue?`
      : `"${selectedProduct.name}" ina historia ya stoo/orders, kwa hiyo itaondolewa kwenye orodha lakini rekodi za zamani zitabaki salama. Endelea?`)) return;

    const { error } = await supabase.from('products').update({ is_active: false }).eq('id', id);
    if (error) { alert('Error: ' + error.message); return; }
  }

  closeProductModal();
  fetchProducts();
  fetchStockMovements();
}

async function submitStockMovement() {
  if (!stkProduct || !stkQty || parseFloat(stkQty) <= 0 || !stkBranch) {
  alert(lang === 'en' ? 'Select product, branch and a valid quantity' : 'Chagua bidhaa, tawi na weka idadi sahihi');
  return;
}
  const { error } = await supabase.from('stock_movements').insert([{
    product_id: stkProduct,
    branch_id: stkBranch || null,
    movement_type: stockModalType,
    quantity: parseFloat(stkQty),
    reference: stkReference,
    notes: stkNotes,
    movement_date: new Date().toISOString().split('T')[0]
  }]);
  if (error) { alert('Error: ' + error.message); return; }
  setStkProduct(''); setStkQty(''); setStkBranch(''); setStkReference(''); setStkNotes('');
setStkProductSearch(''); setShowStkProdDropdown(false);   // <-- ongeza
setStockModalType('');
  fetchStockMovements();
}

function openEditMovement(m: any) {
  const isTransfer = (m.reference || '').startsWith('TRF-');
  if (isTransfer) {
    if (!canEditTransfer(m)) {
      alert(lang === 'en'
        ? 'Only the sending branch Store Keeper can edit a transfer'
        : 'Ni Store Keeper wa tawi linalotuma pekee anayeweza kuhariri uhamisho');
      return;
    }
    
  } else if (!canEditStock() || m.movement_type !== 'in') {
    return;
  }
  setEditingMovement(m);
  setEditMvQty(String(m.quantity));
  setEditMvAdd('');
  setEditMvBranch(m.branch_id ? String(m.branch_id) : '');
  setEditMvReference(m.reference || '');
  setEditMvNotes(m.notes || '');
}

function openAddMoreStock(productId: any, branchId?: any) {
  setEditingMovement(null);
  setStkProduct(String(productId));
  setStkProductSearch('');
  setStkBranch(branchId ? String(branchId) : '');
  setStkReference('');
  setStkNotes('');
  setStockModalType('in');
}

async function updateStockMovement() {
  if (!editingMovement) return;
const isTransfer = (editingMovement.reference || '').startsWith('TRF-');
if (isTransfer ? !canEditTransfer(editingMovement) : !canEditStock()) return;
  const m = editingMovement;
  const base = parseFloat(editMvQty) || 0;
  const extra = parseFloat(editMvAdd) || 0;
  const newQty = base + extra;

  if (isTransfer) {
  await updateTransferMovement(m, newQty);
  return;
}

  if (!base || base <= 0 || newQty <= 0) {
    alert(lang === 'en' ? 'Enter a valid quantity' : 'Weka idadi sahihi');
    return;
  }
  if (!editMvBranch) {
    alert(lang === 'en' ? 'Select branch' : 'Chagua tawi');
    return;
  }

  const unchanged =
    Number(m.quantity) === newQty &&
    String(m.branch_id) === String(editMvBranch) &&
    (m.reference || '') === editMvReference &&
    (m.notes || '') === editMvNotes;
  if (unchanged) { setEditingMovement(null); return; }

  // Ulinzi: stoo isiwe hasi
  const sameBranch = String(m.branch_id) === String(editMvBranch);
  const oldRow = computeStockBalance(m.branch_id).find((p: any) => p.id === m.product_id);
  const oldOnHand = oldRow ? oldRow.onHand : 0;
  const afterOld = sameBranch ? oldOnHand - Number(m.quantity) + newQty : oldOnHand - Number(m.quantity);
  if (afterOld < 0) {
    alert(lang === 'en'
      ? `Cannot reduce: stock already issued. Minimum allowed is ${Number(m.quantity) + afterOld}`
      : `Haiwezi kupunguzwa: stoo tayari imetolewa. Kiwango cha chini ni ${Number(m.quantity) + afterOld}`);
    return;
  }

  setSavingMovement(true);
  const now = new Date().toISOString();

  // 1) Andika historia kwanza
  const { error: logError } = await supabase.from('stock_movement_edits').insert([{
    movement_id: m.id,
    product_id: m.product_id,
    edited_by_id: currentUser?.id || null,
    edited_by_name: currentUser?.full_name || null,
    old_quantity: Number(m.quantity), new_quantity: newQty,
    old_branch_id: m.branch_id, new_branch_id: parseInt(editMvBranch),
    old_reference: m.reference || '', new_reference: editMvReference,
    old_notes: m.notes || '', new_notes: editMvNotes
  }]);
  if (logError) { setSavingMovement(false); alert('Error: ' + logError.message); return; }

  // 2) Kisha sasisha rekodi
  const { error } = await supabase.from('stock_movements').update({
    quantity: newQty,
    branch_id: parseInt(editMvBranch),
    reference: editMvReference,
    notes: editMvNotes,
    edited_by_id: currentUser?.id || null,
    edited_by_name: currentUser?.full_name || null,
    edited_at: now,
    edit_count: (m.edit_count || 0) + 1
  }).eq('id', m.id);
  setSavingMovement(false);

  if (error) { alert('Error: ' + error.message); return; }
  setEditingMovement(null);
  fetchStockMovements();
}

async function openMovementHistory(m: any) {
  setHistoryFor(m);
  setHistoryRows([]);
  const { data } = await supabase
    .from('stock_movement_edits')
    .select('*')
    .eq('movement_id', m.id)
    .order('id', { ascending: false });
  setHistoryRows(data || []);
}

// ---------- Stock Transfer Requests ----------
async function fetchStockRequests() {
  const { data, error } = await supabase
    .from('stock_requests')
    .select('*, products(name), src_branch:branches!from_branch_id(name), req_branch:branches!to_branch_id(name)')
    .order('id', { ascending: false });
  if (error) { console.error(error.message); return; }
  setStockRequests(data || []);
}

async function updateTransferMovement(m: any, newQty: number) {
  // m = rekodi ya OUT (tawi linalotuma); sibling = rekodi ya IN (tawi linalopokea)
  const sibling = stockMovements.find((x: any) =>
    x.reference === m.reference && x.id !== m.id &&
    x.product_id === m.product_id && x.movement_type === 'in'
  );
  if (!sibling) {
    alert(lang === 'en' ? 'Linked receiving record not found' : 'Rekodi ya tawi linalopokea haipatikani');
    return;
  }
  if (newQty === Number(m.quantity)) { setEditingMovement(null); return; }

  const diff = newQty - Number(m.quantity);

  // Tawi linalotuma: onHand - diff isiwe hasi (ikiwa inaongezwa)
  const srcRow = computeStockBalance(m.branch_id).find((p: any) => p.id === m.product_id);
  if ((srcRow?.onHand || 0) - diff < 0) {
    alert(lang === 'en'
      ? 'Not enough stock in your branch for this increase'
      : 'Stoo ya tawi lako haitoshi kuongeza idadi hii');
    return;
  }
  // Tawi linalopokea: onHand + diff isiwe hasi (ikiwa inapunguzwa)
  const destRow = computeStockBalance(sibling.branch_id).find((p: any) => p.id === m.product_id);
  if ((destRow?.onHand || 0) + diff < 0) {
    alert(lang === 'en'
      ? 'Cannot reduce: receiving branch already used this stock'
      : 'Haiwezi kupunguzwa: tawi linalopokea tayari limetumia stoo hii');
    return;
  }
    setSavingMovement(true);
  const now = new Date().toISOString();

  // 1) Rekodi ya OUT (tawi linalotuma)
  const { error: outError } = await supabase.from('stock_movements').update({
    quantity: newQty,
    edited_by_id: currentUser?.id || null,
    edited_by_name: currentUser?.full_name || null,
    edited_at: now,
    edit_count: (m.edit_count || 0) + 1
  }).eq('id', m.id);
  if (outError) { setSavingMovement(false); alert('Error: ' + outError.message); return; }

  // 2) Rekodi ya IN (tawi linalopokea)
  const { error: inError } = await supabase.from('stock_movements').update({
    quantity: newQty,
    edited_by_id: currentUser?.id || null,
    edited_by_name: currentUser?.full_name || null,
    edited_at: now,
    edit_count: (sibling.edit_count || 0) + 1
  }).eq('id', sibling.id);
  setSavingMovement(false);
  if (inError) { alert('Error: ' + inError.message); return; }

  // 3) Sasisha ombi la awali (stock_requests) ili idadi ilingane
  const reqId = parseInt(String(m.reference).replace('TRF-', ''));
  if (!isNaN(reqId)) {
    await supabase.from('stock_requests').update({ quantity: newQty }).eq('id', reqId);
  }

  setEditingMovement(null);
  fetchStockMovements();
  fetchStockRequests();
}

function openTransferModal(opts?: { productId?: any; qty?: number; toBranch?: any; orderId?: number }) {
  setTrfProduct(opts?.productId ? String(opts.productId) : '');
  setTrfQty(opts?.qty ? String(opts.qty) : '');
  setTrfToBranch(opts?.toBranch ? String(opts.toBranch) : (currentUser?.branch_id ? String(currentUser.branch_id) : ''));
  setTrfFromBranch('');
  setTrfTargetType('branch');
  setTrfTargetUser('');
  setTrfOrderId(opts?.orderId || null);
  setTrfNotes('');
  setShowNewTransfer(true);
}

async function submitStockRequest() {
  if (!trfProduct || !trfQty || parseFloat(trfQty) <= 0 || !trfToBranch || !trfFromBranch) {
    alert(lang === 'en' ? 'Select product, quantity and both branches' : 'Chagua bidhaa, idadi na matawi yote mawili');
    return;
  }
  if (trfTargetType === 'staff' && !trfTargetUser) {
    alert(lang === 'en' ? 'Select a staff member' : 'Chagua mfanyakazi');
    return;
  }

  const { error } = await supabase.from('stock_requests').insert([{
    product_id: parseInt(trfProduct),
    quantity: parseFloat(trfQty),
    from_branch_id: parseInt(trfFromBranch),
    to_branch_id: parseInt(trfToBranch),
    target_type: trfTargetType,
    target_user_id: trfTargetType === 'staff' ? parseInt(trfTargetUser) : null,
    order_id: trfOrderId,
    notes: trfNotes,
    status: 'pending',
    requested_by_id: currentUser?.id || null,
    requested_by_name: currentUser?.full_name || null
  }]);

  if (error) { alert('Error: ' + error.message); return; }

  setShowNewTransfer(false);
  setTrfProduct(''); setTrfQty(''); setTrfFromBranch(''); setTrfToBranch('');
  setTrfTargetType('branch'); setTrfTargetUser(''); setTrfOrderId(null); setTrfNotes('');
  fetchStockRequests();
  alert(lang === 'en' ? 'Request sent!' : 'Ombi limetumwa!');
}

function canRespondRequest(r: any) {
  if (r.status !== 'pending' || !currentUser) return false;
  const role = currentUser.role_name || '';
  const isAdmin = /admin|director/i.test(role);
  if (isAdmin) return true;
  if (r.target_type === 'staff') return r.target_user_id === currentUser.id;
  if (r.target_type === 'branch') {
    return role === 'Store Keeper' && String(currentUser.branch_id) === String(r.from_branch_id);
  }
  return false;
}

function canEditStock() {
  const role = currentUser?.role_name || '';
  return /admin|director|manager|store keeper/i.test(role);
}

function canEditTransfer(m: any) {
  return (
    currentUser?.role_name === 'Store Keeper' &&
    m.movement_type === 'out' &&
    (m.reference || '').startsWith('TRF-') &&
    String(currentUser.branch_id) === String(m.branch_id)
  );
}

async function respondStockRequest(r: any, approve: boolean) {
  if (approve) {
    // Hakikisha tawi linaloombwa lina stoo ya kutosha
    const row = computeStockBalance(r.from_branch_id).find((p: any) => p.id === r.product_id);
    const onHand = row ? row.onHand : 0;
    if (Number(r.quantity) > onHand) {
      alert(lang === 'en'
        ? `Not enough stock in source branch. On hand: ${onHand}`
        : `Stoo ya tawi hili haitoshi. Iliyopo: ${onHand}`);
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const ref = `TRF-${r.id}`;
    const { error: mvError } = await supabase.from('stock_movements').insert([
      {
        product_id: r.product_id, branch_id: r.from_branch_id, movement_type: 'out',
        quantity: r.quantity, reference: ref,
        notes: `Transfer to ${r.req_branch?.name || ''}`, movement_date: today
      },
      {
        product_id: r.product_id, branch_id: r.to_branch_id, movement_type: 'in',
        quantity: r.quantity, reference: ref,
        notes: `Transfer from ${r.src_branch?.name || ''}`, movement_date: today
      }
    ]);
    if (mvError) { alert('Error: ' + mvError.message); return; }
  } else {
    if (!window.confirm(lang === 'en' ? 'Reject this request?' : 'Kataa ombi hili?')) return;
  }

  const { error } = await supabase.from('stock_requests').update({
    status: approve ? 'approved' : 'rejected',
    responded_by_name: currentUser?.full_name || null,
    responded_at: new Date().toISOString()
  }).eq('id', r.id);

  if (error) { alert('Error: ' + error.message); return; }
  fetchStockRequests();
  fetchStockMovements();
}

function computeStockBalance(branchId?: any) {
  const balance: any = {};
  stockMovements
    .filter(m => !branchId || String(m.branch_id) === String(branchId))
    .forEach(m => {
      const pid = m.product_id;
      if (!balance[pid]) balance[pid] = { in: 0, out: 0, expired: 0, damaged: 0 };
      balance[pid][m.movement_type] += Number(m.quantity) || 0;
    });
  return products.map(p => {
    const b = balance[p.id] || { in: 0, out: 0, expired: 0, damaged: 0 };
    const onHand = b.in - b.out - b.expired - b.damaged;
    return { ...p, ...b, onHand };
  });
}

async function issueOrderItem(order: any, item: any) {
  const qty = parseFloat(issueQty[item.id]);
  const remaining = (item.quantity_requested || 0) - (item.quantity_supplied || 0);

  if (!qty || qty <= 0) {
    alert(lang === 'en' ? 'Enter a valid quantity' : 'Weka idadi sahihi');
    return;
  }
  if (qty > remaining) {
    alert(lang === 'en' ? `Only ${remaining} remaining for this item` : `Zimebaki ${remaining} tu kwa bidhaa hii`);
    return;
  }

  const isStockItem = item.item_type === 'stock' && item.product_id;
  if (isStockItem) {
    const stockRow = computeStockBalance(order.branch_id).find((p: any) => p.id === item.product_id);
    const onHand = stockRow ? stockRow.onHand : 0;
    if (qty > onHand) {
      alert(lang === 'en' ? `Not enough stock in this branch. On hand: ${onHand}` : `Stoo ya tawi hili haitoshi. Iliyopo: ${onHand}`);
      return;
    }
  }

  setIssuing(true);

  if (isStockItem) {
    const { error: mvError } = await supabase.from('stock_movements').insert([{
      product_id: item.product_id,
      branch_id: order.branch_id || null,
      movement_type: 'out',
      quantity: qty,
      reference: order.order_number,
      notes: `Order ${order.order_number} - ${order.customers?.name || ''}`,
      movement_date: new Date().toISOString().split('T')[0]
    }]);
    if (mvError) { alert('Error: ' + mvError.message); setIssuing(false); return; }
  }

  const newSupplied = (item.quantity_supplied || 0) + qty;
  const itemStatus = newSupplied >= item.quantity_requested ? 'supplied' : 'partial';

  const { error: itemError } = await supabase.from('order_items').update({
    quantity_supplied: newSupplied,
    status: itemStatus
  }).eq('id', item.id);
  if (itemError) { alert('Error: ' + itemError.message); setIssuing(false); return; }

  // Hesabu status mpya ya order nzima
  const allItems = (order.order_items || []).map((it: any) =>
    it.id === item.id ? { ...it, quantity_supplied: newSupplied } : it
  );
  const allDone = allItems.every((it: any) => (it.quantity_supplied || 0) >= it.quantity_requested);
  const newOrderStatus = allDone ? 'ready' : 'processing';
  await supabase.from('orders').update({ status: newOrderStatus }).eq('id', order.id);

  setIssueQty((prev: any) => ({ ...prev, [item.id]: '' }));
  setIssuing(false);
  fetchOrders();
  fetchStockMovements();
}

// ---------- Invoices functions ----------
async function fetchInvoices() {
  setLoadingInvoices(true);
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      orders(order_number),
      customers(name, type, address, phone),
      branches(name),
      invoice_items(*)
    `)
    .order('id', { ascending: false });
  if (!error) setInvoices(data || []);
  setLoadingInvoices(false);
}

async function createInvoice(order: any) {
  const subtotal = (order.order_items || []).reduce((sum: number, item: any) => {
    return sum + ((item.quantity_requested * item.unit_price) * (1 - (item.discount / 100)));
  }, 0);
  const tax = parseFloat(invoiceTax) || 0;
  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;

  const { data: invData, error: invError } = await supabase
    .from('invoices')
    .insert([{
      order_id: order.id,
      customer_id: order.customer_id,
      branch_id: order.branch_id,
      subtotal,
      discount_total: 0,
      tax: taxAmount,
      total_amount: total,
      status: 'unpaid',
      notes: invoiceNotes,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }])
    .select()
    .single();

  if (invError) { alert('Error: ' + invError.message); return; }

  const items = (order.order_items || []).map((item: any) => ({
    invoice_id: invData.id,
    order_item_id: item.id,
    product_id: item.product_id,
    item_name: item.item_name,
    quantity: item.quantity_requested,
    unit_price: item.unit_price,
    discount: item.discount || 0,
    total_price: (item.quantity_requested * item.unit_price) * (1 - (item.discount / 100))
  }));

  await supabase.from('invoice_items').insert(items);
  setCreatingInvoiceFor(null);
  setInvoiceTax('0');
  setInvoiceNotes('');
  fetchInvoices();
  alert(lang === 'en' ? 'Invoice created successfully!' : 'Invoice imeundwa!');
}

async function updateInvoiceStatus(id: number, status: string) {
  await supabase.from('invoices').update({ status }).eq('id', id);
  fetchInvoices();
}

function deliveryNosForOrder(orderId: any) {
  return deliveries.filter(d => d.order_id === orderId).map(d => d.delivery_number).filter(Boolean).join(', ');
}
function invoiceNoForOrder(orderId: any) {
  return invoices.find(i => i.order_id === orderId)?.invoice_number || '';
}

const docTag = (label: string, value: string, bg: string, color: string) => (
  <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'2px',whiteSpace:'nowrap'}}>
    <span style={{background:bg,color,fontSize:'9px',fontWeight:800,padding:'1px 5px',borderRadius:'4px',minWidth:'28px',textAlign:'center'}}>{label}</span>
    <span style={{fontFamily:'monospace',fontSize:'11px',fontWeight:600,color: value ? '#0a1628' : '#cbd5e1'}}>{value || '—'}</span>
  </div>
);
const docNos = (ord: string, inv: string, dlv: string) => (
  <>
    {docTag('ORD', ord, '#dbeafe', '#1d4ed8')}
    {docTag('INV', inv, '#fef3c7', '#92400e')}
    {docTag('DLV', dlv, '#dcfce7', '#15803d')}
  </>
);

async function printInvoice(inv: any) {
  const { data: cs } = await supabase
    .from('company_settings').select('*').eq('id', 1).maybeSingle();

  const esc = (v: any) => String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = (n: number) => Number(n || 0).toLocaleString();

  const cName = cs?.company_name || companyName || 'Joleo Company Limited';
  const cAddress = cs?.address || '';
  const cPhone = cs?.phone || '';
  const cEmail = cs?.email || '';

  const items: any[] = inv.invoice_items || [];
  const gross = items.reduce((s, it) => s + (Number(it.quantity) * Number(it.unit_price)), 0);
  const discountTotal = items.reduce((s, it) =>
    s + (Number(it.quantity) * Number(it.unit_price) * (Number(it.discount || 0) / 100)), 0);
  const tax = Number(inv.tax || 0);
  const total = Number(inv.total_amount || (gross - discountTotal + tax));

  const isOrder = !!inv.order_id;
  const customerHtml = isOrder
    ? `${esc(inv.customers?.name || '')}<br/>${esc(inv.orders?.order_number || '')}`
    : 'Walk-In-Customer';
  const customerPhone = inv.customers?.phone || '';

  const rows = items.map((it, i) => `
    <tr class="${i % 2 === 0 ? 'shade' : ''}">
      <td>${i + 1}</td>
      <td class="left">${esc(it.item_name)}</td>
      <td>${fmt(it.quantity)}</td>
      <td>${fmt(it.unit_price)}</td>
      <td>${Number(it.discount || 0) > 0 ? esc(it.discount) + '%' : '-'}</td>
      <td>${fmt(it.total_price)}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>${esc(inv.invoice_number)}</title>
<style>
  @page { size: A4; margin: 15mm; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; color: #1e293b; font-size: 13px; margin: 0; }

  .top { display: flex; justify-content: space-between; align-items: flex-start; }
  .inv-title { font-size: 46px; font-weight: 800; color: #1e40af; letter-spacing: 1px; line-height: 1; }
  .company { text-align: right; line-height: 1.6; }
  .company .name { font-size: 18px; font-weight: bold; color: #1e40af; }

  .rule { border: 0; border-top: 3px solid #1e40af; margin: 18px 0; }

  .meta { display: flex; margin-bottom: 22px; }
  .meta .col { flex: 1; line-height: 1.8; text-align: left; }
  .meta .divider { width: 2px; background: #1e40af; margin: 0 24px; }
  .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .5px; }
  .val { font-weight: bold; }

  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #1e40af; color: #fff; }
  th { font-weight: bold; text-align: center; padding: 10px 8px; }
  td { text-align: center; padding: 9px 8px; border-bottom: 1px solid #dbeafe; font-weight: normal; }
  th.left, td.left { text-align: left; }
  tr.shade td { background: #eff6ff; }
  tbody { border-bottom: 2px solid #1e40af; }

  .totals { margin-top: 16px; margin-left: auto; width: 50%; }
  .totals .r { display: flex; justify-content: space-between; padding: 5px 8px; }
  .totals .b { font-weight: bold; }
  .grand { display: flex; justify-content: space-between; margin-top: 8px; padding: 10px 12px;
           background: #1e40af; color: #fff; font-weight: bold; font-size: 16px; }
</style></head>
<body>
  <div class="top">
    <div class="inv-title">INVOICE</div>
    <div class="company">
      <div class="name">${esc(cName)}</div>
      ${cAddress ? `<div>${esc(cAddress)}</div>` : ''}
      ${cPhone ? `<div>Mobile: ${esc(cPhone)}</div>` : ''}
      ${cEmail ? `<div>Email: ${esc(cEmail)}</div>` : ''}
    </div>
  </div>

  <hr class="rule"/>

  <div class="meta">
    <div class="col">
      <div class="label">Invoice No</div>
      <div class="val">${esc(inv.invoice_number)}</div>
      <div class="label" style="margin-top:8px">Date</div>
      <div class="val">${inv.created_at ? new Date(inv.created_at).toLocaleDateString() : ''}</div>
    </div>
    <div class="divider"></div>
    <div class="col">
      <div class="label">Customer</div>
      <div class="val">${customerHtml}</div>
      ${customerPhone ? `<div class="label" style="margin-top:8px">Mobile</div><div class="val">${esc(customerPhone)}</div>` : ''}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th><th class="left">Item</th><th>Qty</th><th>Price</th><th>Disc</th><th>Total</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <div class="r b"><span>Subtotal</span><span>TSh ${fmt(gross)}</span></div>
    ${discountTotal > 0 ? `<div class="r"><span>Discount (-)</span><span>TSh ${fmt(discountTotal)}</span></div>` : ''}
    ${tax > 0 ? `<div class="r"><span>Tax</span><span>TSh ${fmt(tax)}</span></div>` : ''}
    <div class="grand"><span>TOTAL</span><span>TSh ${fmt(total)}</span></div>
  </div>

  <script>window.onload = function(){ window.print(); };</script>
</body></html>`;

  const w = window.open('', '_blank', 'width=900,height=800');
  if (!w) {
    alert(lang === 'en' ? 'Please allow pop-ups to print' : 'Tafadhali ruhusu pop-ups ili uchapishe');
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// ---------- Deliveries functions ----------
async function fetchDeliveries() {
  setLoadingDeliveries(true);
  const { data, error } = await supabase
    .from('deliveries')
    .select(`
      *,
      orders(order_number),
      customers(name, phone, address),
      branches(name),
      invoices(invoice_number),
      delivery_items(*)
    `)
    .order('id', { ascending: false });
  if (!error) setDeliveries(data || []);
  setLoadingDeliveries(false);
}

async function createDelivery(order: any) {
  const { data: delData, error: delError } = await supabase
    .from('deliveries')
    .insert([{
      order_id: order.id,
      customer_id: order.customer_id,
      branch_id: order.branch_id,
      delivery_date: new Date().toISOString().split('T')[0],
      received_by_customer: receivedByCustomer,
      status: 'pending',
      notes: deliveryNotes
    }])
    .select()
    .single();

  if (delError) { alert('Error: ' + delError.message); return; }

  const items = deliveryItems.map((item: any) => ({
    delivery_id: delData.id,
    order_item_id: item.id,
    product_id: item.product_id,
    item_name: item.item_name,
    quantity_ordered: item.quantity_requested,
    quantity_delivered: parseInt(item.qty_to_deliver) || 0,
    quantity_pending: item.quantity_requested - (parseInt(item.qty_to_deliver) || 0),
    status: (parseInt(item.qty_to_deliver) || 0) >= item.quantity_requested ? 'delivered' : 
            (parseInt(item.qty_to_deliver) || 0) > 0 ? 'partial' : 'pending',
    notes: item.delivery_note || ''
  }));

  await supabase.from('delivery_items').insert(items);
  setCreatingDeliveryFor(null);
  setDeliveryItems([]);
  setDeliveryNotes('');
  setReceivedByCustomer('');
  fetchDeliveries();
  alert(lang === 'en' ? 'Delivery note created!' : 'Delivery note imeundwa!');
}

async function updateDeliveryStatus(id: number, status: string) {
  await supabase.from('deliveries').update({ status }).eq('id', id);
  fetchDeliveries();
}

// ---------- Payments functions ----------
async function fetchPayments() {
  setLoadingPayments(true);
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      invoices(invoice_number, total_amount),
      customers(name),
      branches(name)
    `)
    .order('id', { ascending: false });
  if (!error) setPayments(data || []);
  setLoadingPayments(false);
}

async function submitPayment() {
  if (!paymentInvoiceId || !paymentAmount) {
    alert(lang === 'en' ? 'Select invoice and enter amount' : 'Chagua invoice na weka kiasi');
    return;
  }
  const invoice = invoices.find(inv => inv.id === parseInt(paymentInvoiceId));
  if (!invoice) return;

  const { error } = await supabase.from('payments').insert([{
    invoice_id: paymentInvoiceId,
    customer_id: invoice.customer_id,
    branch_id: invoice.branch_id,
    amount: parseFloat(paymentAmount),
    payment_method: paymentMethod,
    reference_number: paymentReference,
    payment_date: new Date().toISOString().split('T')[0],
    status: 'confirmed',
    notes: paymentNotes
  }]);

  if (error) { alert('Error: ' + error.message); return; }

  // Update invoice status
  const totalPaid = payments
    .filter(p => p.invoice_id === parseInt(paymentInvoiceId) && p.status === 'confirmed')
    .reduce((sum, p) => sum + p.amount, 0) + parseFloat(paymentAmount);

  const newStatus = totalPaid >= invoice.total_amount ? 'paid' :
                    totalPaid > 0 ? 'partial' : 'unpaid';
  await supabase.from('invoices').update({ status: newStatus }).eq('id', paymentInvoiceId);

  setShowNewPayment(false);
  setPaymentInvoiceId(''); setPaymentAmount('');
  setPaymentMethod('cash'); setPaymentReference('');
  setPaymentNotes('');
  fetchPayments();
  fetchInvoices();
  alert(lang === 'en' ? 'Payment recorded!' : 'Malipo yamerekodiwa!');
}

async function cancelPayment(id: number) {
  if (!window.confirm(lang === 'en' ? 'Cancel this payment?' : 'Ghairi malipo haya?')) return;
  await supabase.from('payments').update({ status: 'cancelled' }).eq('id', id);
  fetchPayments();
}

// ---------- Wakala functions ----------
async function fetchWakala() {
  setLoadingWakala(true);
  const { data, error } = await supabase
    .from('wakala_transactions')
    .select('*, branches(name)')
    .order('id', { ascending: false });
  if (!error) {
    setWakalaTxns(data || []);
    // Calculate summary
    const summary = (data || []).reduce((acc: any, txn: any) => {
      if (txn.status === 'completed') {
        acc.totalAmount = (acc.totalAmount || 0) + (txn.amount || 0);
        acc.totalCommission = (acc.totalCommission || 0) + (txn.commission || 0);
        acc.count = (acc.count || 0) + 1;
      }
      return acc;
    }, {});
    setWakalaSummary(summary);
  }
  setLoadingWakala(false);
}

async function submitWakala() {
  if (!wkNetwork || !wkCustName || !wkAmount || !wkBranch) {
    alert(lang === 'en' ? 'Fill all required fields' : 'Jaza sehemu zote zinazohitajika');
    return;
  }
  const { error } = await supabase.from('wakala_transactions').insert([{
    branch_id: wkBranch,
    transaction_type: wkType,
    network: wkNetwork,
    customer_name: wkCustName,
    customer_phone: wkCustPhone,
    amount: parseFloat(wkAmount),
    commission: parseFloat(wkCommission) || 0,
    reference_number: wkReference,
    transaction_date: new Date().toISOString().split('T')[0],
    status: 'completed',
    notes: wkNotes
  }]);
  if (error) { alert('Error: ' + error.message); return; }
  setShowNewWakala(false);
  setWkType('deposit'); setWkNetwork(''); setWkCustName('');
  setWkCustPhone(''); setWkAmount(''); setWkCommission('');
  setWkReference(''); setWkNotes(''); setWkBranch('');
  fetchWakala();
}

async function updateWakalaStatus(id: number, status: string) {
  await supabase.from('wakala_transactions').update({ status }).eq('id', id);
  fetchWakala();
}

// ---------- Settings functions ----------
async function createStaffAccount() {
  if (!selectedStaffAccount || !selectedStaffAccount.email) {
    alert(lang === 'en' ? 'Select a staff member with an email first' : 'Chagua mfanyakazi mwenye barua pepe kwanza');
    return;
  }
  if (!newUserPassword || newUserPassword.length < 6) {
    alert(lang === 'en' ? 'Password must be at least 6 characters' : 'Nywila lazima iwe herufi 6 au zaidi');
    return;
  }
  setCreatingUser(true);

  try {
    const { data: { session } } = await supabase.auth.getSession();

    const response = await fetch('https://ycuascjklmnqpxvmxcmo.supabase.co/functions/v1/create-staff', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}`,
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdWFzY2prbG1ucXB4dm14Y21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MzE4ODgsImV4cCI6MjEwNTQwNzg4OH0.vyxY9-9Num4-bXuZmol-SoJn9nDX94uKNvJetYpV4tg'
  },
      body: JSON.stringify({
        email: selectedStaffAccount.email,
        password: newUserPassword
      })
    });

    const result = await response.json();

    if (result.error) {
      alert('Error: ' + result.error);
    } else {
      alert(lang === 'en'
        ? `Account created! ${selectedStaffAccount.full_name} can now login with:\nEmail: ${selectedStaffAccount.email}\nPassword: ${newUserPassword}`
        : `Akaunti imeundwa! ${selectedStaffAccount.full_name} anaweza kuingia kwa:\nBarua pepe: ${selectedStaffAccount.email}\nNywila: ${newUserPassword}`
      );
      setNewUserPassword('');
      setSelectedStaffAccount(null);
      setStaffAccountSearch('');
      fetchStaff();
    }
  } catch (err: any) {
    alert('Error: ' + err.message);
  }
  setCreatingUser(false);
}

 if (page !== 'login' && currentUser) {
    const role = currentUser.role_name;

    if (role === 'Secretary' || role === 'Service Men') {
      return (
        <SecretaryServicePortal
          currentUser={currentUser}
          lang={lang}
          setLang={setLang}
          onLogout={() => {
            supabase.auth.signOut();
            setPage('login');
            setCurrentUser(null);
          }}
        />
      );
    }
  }

  const requestCount = orders.filter(o =>
  isActiveRequest(o) &&
  (currentUser?.role_name !== 'Store Keeper' || String(o.branch_id) === String(currentUser.branch_id))
).length;

// Idadi ya requests zinazosubiri kwa kila tawi
const requestCountByBranch: Record<string, number> = {};
orders.filter(isActiveRequest).forEach(o => {
  const k = String(o.branch_id);
  requestCountByBranch[k] = (requestCountByBranch[k] || 0) + 1;
});
const totalRequestCount = orders.filter(isActiveRequest).length;

  if (page !== 'login') {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial', background: '#f3f4f6' }}>
        <div style={{
  width: '180px',
  minWidth: '180px',
  maxWidth: '180px',
  background: '#0a1628',
  color: 'white',
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box'
}}>
          <div style={{ textAlign: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #1a2f55' }}>
            <div style={{ width: '50px', height: '50px', background: '#c9a84c', borderRadius: '50%', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', color: '#0a1628' }}>JCL</div>
            <div style={{ fontSize: '10px', color: '#c9a84c', fontWeight: 'bold' }}>JOLEO COMPANY LIMITED</div>
          </div>
          {[
            { icon: <LayoutDashboard size={16} />, name: 'Dashboard', key: 'dashboard' },
            { icon: <Building2 size={16} />, name: 'Branches', key: 'branches' },
            { icon: <Users size={16} />, name: 'Staff', key: 'staff' },
            { icon: <Handshake size={16} />, name: 'Customers', key: 'customers' },
            { icon: <Package size={16} />, name: 'Orders', key: 'orders' },
            { icon: <Warehouse size={16} />, name: 'Stock', key: 'stock' },
            { icon: <FileText size={16} />, name: 'Invoices', key: 'invoices' },
            { icon: <Truck size={16} />, name: 'Deliveries', key: 'deliveries' },
            { icon: <CreditCard size={16} />, name: 'Payments', key: 'payments' },
            { icon: <Smartphone size={16} />, name: 'Wakala', key: 'wakala' },
            { icon: <BarChart3 size={16} />, name: 'Reports', key: 'reports' },
            { icon: <Settings size={16} />, name: 'Settings', key: 'settings' },
          ].map(item => (
  <React.Fragment key={item.name}>
    <div
      onClick={() => {
        if (item.key === 'stock') {
          if (branches.length === 0) fetchBranches();
          if (page === 'stock') setStockMenuOpen(o => !o);
          else { setStockMenuOpen(true); setPage('stock'); }
        } else {
          setPage(item.key);
        }
      }}
      style={{ padding: '9px 10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '3px', fontSize: '12px', color: page === item.key ? '#0a1628' : '#cbd5e1', background: page === item.key ? '#c9a84c' : 'transparent', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {item.icon} {item.name}
      {item.key === 'stock' && requestCount > 0 && (
        <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '10px', fontWeight: 'bold' }}>{requestCount}</span>
      )}
      {item.key === 'stock' && currentUser?.role_name !== 'Store Keeper' && (
        <span style={{ marginLeft: requestCount > 0 ? '6px' : 'auto', fontSize: '10px' }}>
          {stockMenuOpen && page === 'stock' ? '▾' : '▸'}
        </span>
      )}
    </div>

    {/* Dropdown ya matawi chini ya Stock */}
    {item.key === 'stock' && stockMenuOpen && currentUser?.role_name !== 'Store Keeper' && (
      <div style={{ marginLeft: '14px', marginBottom: '6px', borderLeft: '1px solid #1a2f55', paddingLeft: '6px' }}>
        <div
  onClick={() => { setStockBranchFilter(''); setPage('stock'); }}
  style={{ padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', marginBottom: '2px',
    display: 'flex', alignItems: 'center', gap: '6px',
    background: stockBranchFilter === '' ? '#1a2f55' : 'transparent',
    color: stockBranchFilter === '' ? '#c9a84c' : '#cbd5e1',
    fontWeight: stockBranchFilter === '' ? 'bold' : 'normal' }}>
  🌐 {lang === 'en' ? 'ALL BRANCHES' : 'MATAWI YOTE'}
  {totalRequestCount > 0 && (
    <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: 'bold' }}>
      {totalRequestCount}
    </span>
  )}
</div>

        {branches.map(b => {
  const cnt = requestCountByBranch[String(b.id)] || 0;
  return (
    <div key={b.id}
      onClick={() => { setStockBranchFilter(String(b.id)); setPage('stock'); }}
      style={{ padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', marginBottom: '2px',
        display: 'flex', alignItems: 'center', gap: '6px',
        background: stockBranchFilter === String(b.id) ? '#1a2f55' : 'transparent',
        color: stockBranchFilter === String(b.id) ? '#c9a84c' : '#cbd5e1',
        fontWeight: stockBranchFilter === String(b.id) ? 'bold' : 'normal' }}>
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        🏢 {b.name}{b.is_headquarter ? ' (HQ)' : ''}
      </span>
      {cnt > 0 && (
        <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: 'bold', flexShrink: 0 }}>
          {cnt}
        </span>
      )}
    </div>
  );
})}
      </div>
    )}
  </React.Fragment>
))}
          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #1a2f55' }}>
            <div onClick={() => { supabase.auth.signOut(); setPage('login'); setCurrentUser(null); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} />{lang === 'en' ? 'Logout' : 'Toka'}
            </div>
          </div>
        </div>

        <div style={{
  position: 'fixed',
  top: 0,
  left: '180px',
  right: 0,
  bottom: 0,
  padding: '20px',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  background: '#f3f4f6'
}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: 0, color: '#0a1628', fontSize: '22px', fontWeight: 'bold' }}>
                {page === 'dashboard' && '👑 Director Dashboard'}
                {page === 'branches' && '🏢 Branches Management'}
                {page === 'staff' && '👥 Staff Management'}
                {page === 'customers' && '🤝 Customers Management'}
                {page === 'orders' && '📦 Orders Management'}
                {page === 'stock' && '📊 Stock Management'}
                {page === 'invoices' && '🧾 Invoices Management'}
                {page === 'deliveries' && '🚚 Deliveries Management'}
                {page === 'payments' && '💰 Payments Management'}
                {page === 'wakala' && '📱 Wakala Transactions'}
                {page === 'reports' && '📈 Reports & Analytics'}
                {page === 'settings' && '⚙️ Settings'}
{!['dashboard','branches','staff','customers','orders','stock','invoices',
   'deliveries','payments','wakala','reports','settings'].includes(page) && 
  (lang==='en'?'Coming soon':'Inakuja hivi karibuni')}
              </h1>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '13px' }}>Joleo Company Limited — {new Date().toLocaleDateString()}</p>
            </div>
            <button onClick={() => setLang(lang === 'en' ? 'sw' : 'en')} style={{ background: '#c9a84c', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
              {lang === 'en' ? '🇹🇿 Swahili' : '🇬🇧 English'}
            </button>
          </div>

          {page === 'dashboard' && (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
      {[
        {
          title: lang === 'en' ? 'Total Orders' : 'Jumla ya Orders',
          value: orders.length.toLocaleString(),
          icon: '📦', color: '#0a1628'
        },
        {
          title: lang === 'en' ? 'Total Revenue' : 'Jumla ya Mapato',
          value: `TSh ${payments.filter(p => p.status === 'confirmed').reduce((s, p) => s + (p.amount || 0), 0).toLocaleString()}`,
          icon: '💰', color: '#15803d'
        },
        {
          title: lang === 'en' ? 'Active Staff' : 'Wafanyakazi',
          value: staff.filter(s => s.is_active).length.toLocaleString(),
          icon: '👥', color: '#1d4ed8'
        },
        {
          title: lang === 'en' ? 'Pending' : 'Zinazosubiri',
          value: orders.filter(o => ['received', 'processing', 'pending'].includes(o.status)).length.toLocaleString(),
          icon: '⏳', color: '#b45309'
        },
      ].map(card => (
        <div key={card.title} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${card.color}` }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>{card.icon}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{card.title}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 16px', color: '#0a1628' }}>📋 {lang === 'en' ? 'Recent Orders' : 'Orders za Hivi Karibuni'}</h3>
        {loadingOrders ? (
          <p style={{ color: '#666' }}>{lang === 'en' ? 'Loading...' : 'Inapakia...'}</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📭</div>
            <div>{lang === 'en' ? 'No orders yet' : 'Hakuna orders bado'}</div>
          </div>
        ) : (
          orders.slice(0, 6).map(o => (
            <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '13px' }}>
              <div>
                <div style={{ fontWeight: '700', fontFamily: 'monospace', color: '#0a1628' }}>{o.order_number}</div>
                <div style={{ color: '#666' }}>{o.customers?.name || '-'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '600' }}>TSh {(o.total_amount || 0).toLocaleString()}</div>
                <div style={{ color: '#999', fontSize: '11px', textTransform: 'capitalize' }}>{o.status}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 16px', color: '#0a1628' }}>🏢 {lang === 'en' ? 'Branches' : 'Matawi'}</h3>
        {branches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏗️</div>
            <div>{lang === 'en' ? 'No branches yet' : 'Hakuna matawi bado'}</div>
          </div>
        ) : branches.slice(0, 5).map(b => (
          <div key={b.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>{b.name}</div>
        ))}
      </div>
    </div>
  </>
)}

          {page === 'branches' && (
  <div>
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Add New Branch':'Ongeza Tawi Jipya'}</h3>
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
        <input 
          placeholder={lang==='en'?'Branch name':'Jina la tawi'} 
          value={newBranchName} 
          onChange={e=>setNewBranchName(e.target.value)} 
          style={{flex:'1 1 180px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}} 
        />
        <input 
          placeholder={lang==='en'?'Location':'Mahali'} 
          value={newBranchLocation} 
          onChange={e=>setNewBranchLocation(e.target.value)} 
          style={{flex:'1 1 180px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}} 
        />
        <input 
          placeholder={lang==='en'?'Phone':'Simu'} 
          value={newBranchPhone || ''} 
          onChange={e=>setNewBranchPhone(e.target.value)} 
          style={{flex:'1 1 140px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}} 
        />
        <div style={{flex:'1 1 140px',display:'flex',alignItems:'center',gap:'8px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px'}}>
          <input 
            type="checkbox" 
            id="isHQ" 
            checked={newBranchIsHQ || false}
            onChange={e=>setNewBranchIsHQ(e.target.checked)}
          />
          <label htmlFor="isHQ" style={{fontSize:'14px',cursor:'pointer'}}>
            {lang==='en'?'Is Headquarters':'Ni HQ'}
          </label>
        </div>
        <button 
          onClick={addBranch} 
          style={{padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>
          {lang==='en'?'Add Branch':'Ongeza Tawi'}
        </button>
      </div>
    </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: '#0a1628' }}>{lang === 'en' ? 'All Branches' : 'Matawi Yote'}</h3>
                {loadingBranches ? <p>{lang === 'en' ? 'Loading...' : 'Inapakia...'}</p> : branches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏗️</div>
                    <div>{lang === 'en' ? 'No branches yet' : 'Hakuna matawi bado'}</div>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', fontSize: '13px', color: '#666' }}>
  <th style={{ padding: '8px' }}>{lang === 'en' ? 'Name' : 'Jina'}</th>
  <th style={{ padding: '8px' }}>{lang === 'en' ? 'Location' : 'Mahali'}</th>
  <th style={{ padding: '8px' }}>{lang === 'en' ? 'Phone' : 'Simu'}</th>
  <th style={{ padding: '8px' }}>HQ</th>
  <th style={{ padding: '8px' }}></th>
</tr></thead>
                    <tbody>
                      {branches.map(b => (
                        <React.Fragment key={b.id}>
                          <tr style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px' }}>
  <td style={{ padding: '8px' }}>
    {editingBranch === b.id ? (
      <input value={editName} onChange={e => setEditName(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }} />
    ) : b.name}
  </td>
  <td style={{ padding: '8px' }}>
    {editingBranch === b.id ? (
      <input value={editLocation} onChange={e => setEditLocation(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }} />
    ) : (b.location || '-')}
  </td>
  <td style={{ padding: '8px' }}>
    {editingBranch === b.id ? (
      <input value={editPhone} onChange={e => setEditPhone(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }} />
    ) : (b.phone || '-')}
  </td>
  <td style={{ padding: '8px' }}>
    {editingBranch === b.id ? (
      <input type="checkbox" checked={editIsHQ} onChange={e => setEditIsHQ(e.target.checked)} />
    ) : (b.is_headquarter ? (
      <span style={{ background: '#c9a84c', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>HQ</span>
    ) : '-')}
  </td>
  <td style={{ padding: '8px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    {editingBranch === b.id ? (
      <>
        <button onClick={() => updateBranch(b.id)} style={{ background: 'none', border: 'none', color: '#15803d', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Save' : 'Hifadhi'}</button>
        <button onClick={() => setEditingBranch(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Cancel' : 'Ghairi'}</button>
      </>
    ) : (
      <>
        <button onClick={() => { setEditingBranch(b.id); setEditName(b.name); setEditLocation(b.location || ''); setEditPhone(b.phone || ''); setEditIsHQ(b.is_headquarter || false); }} style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Edit' : 'Hariri'}</button>
        <button onClick={() => toggleBranchExpansion(b.id)} style={{ background: 'none', border: 'none', color: '#0a1628', cursor: 'pointer', fontSize: '13px' }}>{expandedBranch === b.id ? (lang === 'en' ? 'Hide staff' : 'Ficha wafanyakazi') : (lang === 'en' ? 'View staff' : 'Ona wafanyakazi')}</button>
        <button onClick={() => deleteBranch(b.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Delete' : 'Futa'}</button>
      </>
    )}
  </td>
</tr>
                          {expandedBranch === b.id && (
                            <tr>
                              <td colSpan={5} style={{ padding: '12px', background: '#f9fafb' }}>
                                {!branchStaff[b.id] ? (
                                  <p style={{ fontSize: '13px', color: '#666' }}>{lang === 'en' ? 'Loading staff...' : 'Inapakia wafanyakazi...'}</p>
                                ) : branchStaff[b.id].length === 0 ? (
                                  <p style={{ fontSize: '13px', color: '#999' }}>{lang === 'en' ? 'No staff assigned to this branch yet' : 'Hakuna mfanyakazi bado kwenye tawi hili'}</p>
                                ) : (
                                  <table style={{ width: '100%', fontSize: '13px' }}>
                                    <thead><tr style={{ color: '#666', textAlign: 'left' }}>
                                      <th style={{ padding: '4px' }}>{lang === 'en' ? 'Name' : 'Jina'}</th>
                                      <th style={{ padding: '4px' }}>{lang === 'en' ? 'Email' : 'Barua Pepe'}</th>
                                      <th style={{ padding: '4px' }}>{lang === 'en' ? 'Role' : 'Jukumu'}</th>
                                    </tr></thead>
                                    <tbody>
                                      {branchStaff[b.id].map((s: any) => (
                                        <tr key={s.id} style={{ borderTop: '1px solid #eee' }}>
                                          <td style={{ padding: '4px' }}>{s.full_name}</td>
                                          <td style={{ padding: '4px' }}>{s.email}</td>
                                          <td style={{ padding: '4px' }}>{s.roles?.name || '-'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {page === 'staff' && (
            <div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 16px', color: '#0a1628' }}>{lang === 'en' ? 'Add New Staff' : 'Ongeza Mfanyakazi Mpya'}</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input placeholder={lang === 'en' ? 'Full name' : 'Jina kamili'} value={newStaffName} onChange={e => setNewStaffName(e.target.value)} style={{ flex: '1 1 180px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
                  <input placeholder={lang === 'en' ? 'Email' : 'Barua pepe'} value={newStaffEmail} onChange={e => setNewStaffEmail(e.target.value)} style={{ flex: '1 1 180px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
                  <input placeholder={lang === 'en' ? 'Phone' : 'Simu'} value={newStaffPhone} onChange={e => setNewStaffPhone(e.target.value)} style={{ flex: '1 1 140px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
                  <select value={newStaffRole} onChange={e => setNewStaffRole(e.target.value)} style={{ flex: '1 1 140px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
                    <option value="">{lang === 'en' ? 'Select role' : 'Chagua role'}</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                  <select value={newStaffBranch} onChange={e => setNewStaffBranch(e.target.value)} style={{ flex: '1 1 140px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
  <option value="">{lang === 'en' ? 'Select branch' : 'Chagua tawi'}</option>
  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
</select>
<select value={newStaffStatus} onChange={e => setNewStaffStatus(e.target.value)} style={{ flex: '1 1 140px', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
  <option value="Active">{lang === 'en' ? 'Active' : 'Anafanya Kazi'}</option>
  <option value="Suspended">{lang === 'en' ? 'Suspended' : 'Amesimamishwa'}</option>
  <option value="On Leave">{lang === 'en' ? 'On Leave' : 'Likizo'}</option>
</select>
                  <button onClick={addStaff} style={{ padding: '10px 20px', background: '#0a1628', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{lang === 'en' ? 'Add' : 'Ongeza'}</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: '#0a1628' }}>{lang === 'en' ? 'All Staff' : 'Wafanyakazi Wote'}</h3>
                {loadingStaff ? <p>{lang === 'en' ? 'Loading...' : 'Inapakia...'}</p> : staff.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>👥</div>
                    <div>{lang === 'en' ? 'No staff yet' : 'Hakuna mfanyakazi bado'}</div>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', fontSize: '13px', color: '#666' }}>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Name' : 'Jina'}</th>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Email' : 'Barua Pepe'}</th>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Phone' : 'Simu'}</th>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Role' : 'Jukumu'}</th>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Branch' : 'Tawi'}</th>
                      <th style={{ padding: '8px' }}>{lang === 'en' ? 'Status' : 'Hali'}</th>
                      <th style={{ padding: '8px' }}></th>
                    </tr></thead>
                    <tbody>
                      {staff.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px' }}>
                          {editingStaff === s.id ? (
                            <>
                              <td style={{ padding: '8px' }}><input value={editStaffName} onChange={e => setEditStaffName(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px', width: '100%' }} /></td>
                              <td style={{ padding: '8px' }}><input value={editStaffEmail} onChange={e => setEditStaffEmail(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px', width: '100%' }} /></td>
                              <td style={{ padding: '8px' }}><input value={editStaffPhone} onChange={e => setEditStaffPhone(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px', width: '100%' }} /></td>
                              <td style={{ padding: '8px' }}>
                                <select value={editStaffRole} onChange={e => setEditStaffRole(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }}>
                                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select value={editStaffBranch} onChange={e => setEditStaffBranch(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }}>
                                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                     <select value={editStaffStatus} onChange={e => setEditStaffStatus(e.target.value)} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '6px' }}>
                     <option value="Active">{lang === 'en' ? 'Active' : 'Anafanya Kazi'}</option>
                     <option value="Suspended">{lang === 'en' ? 'Suspended' : 'Amesimamishwa'}</option>
                     <option value="On Leave">{lang === 'en' ? 'On Leave' : 'Likizo'}</option>
                     </select>
                    </td>
                              <td style={{ padding: '8px', textAlign: 'right' }}>
                                <button onClick={() => updateStaff(s.id)} style={{ background: 'none', border: 'none', color: '#15803d', cursor: 'pointer', fontSize: '13px', marginRight: '8px' }}>{lang === 'en' ? 'Save' : 'Hifadhi'}</button>
                                <button onClick={() => setEditingStaff(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Cancel' : 'Ghairi'}</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={{ padding: '8px' }}>{s.full_name}</td>
                              <td style={{ padding: '8px' }}>{s.email}</td>
                              <td style={{ padding: '8px' }}>{s.phone || '-'}</td>
                              <td style={{ padding: '8px' }}>{s.roles?.name || '-'}</td>
                              <td style={{ padding: '8px' }}>{s.branches?.name || '-'}</td>
                              <td style={{ padding: '8px' }}>
  <span style={{
    background: s.status==='Suspended'?'#fee2e2':s.status==='On Leave'?'#fef9c3':'#dcfce7',
    color: s.status==='Suspended'?'#dc2626':s.status==='On Leave'?'#854d0e':'#15803d',
    padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'
  }}>
    {s.status || 'Active'}
  </span>
</td>
                              <td style={{ padding: '8px', textAlign: 'right' }}>
                                <button onClick={() => { setEditingStaff(s.id); setEditStaffName(s.full_name); setEditStaffEmail(s.email); setEditStaffPhone(s.phone || ''); setEditStaffRole(s.role_id); setEditStaffBranch(s.branch_id); setEditStaffStatus(s.status || 'Active'); }} style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: '13px', marginRight: '8px' }}>{lang === 'en' ? 'Edit' : 'Hariri'}</button>
                                <button onClick={() => deleteStaff(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>{lang === 'en' ? 'Delete' : 'Futa'}</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )} 
              </div>
            </div>
          )}

          {page === 'customers' && (
  <div>
    {/* Add Customer Form */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Add New Customer':'Ongeza Mteja Mpya'}</h3>
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
        <input
          placeholder={lang==='en'?'Full name':'Jina kamili'}
          value={newCustName} onChange={e=>setNewCustName(e.target.value)}
          style={{flex:'1 1 180px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <select
          value={newCustType} onChange={e=>setNewCustType(e.target.value)}
          style={{flex:'1 1 150px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'Select type':'Chagua aina'}</option>
          <option value="Private School">{lang==='en'?'Private School':'Shule Binafsi'}</option>
          <option value="Government School">{lang==='en'?'Government School':'Shule ya Serikali'}</option>
          <option value="Hospital">{lang==='en'?'Hospital':'Hospitali'}</option>
          <option value="Company">{lang==='en'?'Company':'Kampuni'}</option>
          <option value="Government">{lang==='en'?'Government':'Serikali'}</option>
          <option value="Private">{lang==='en'?'Private':'Binafsi'}</option>
        </select>
        <input
          placeholder={lang==='en'?'Phone':'Simu'}
          value={newCustPhone} onChange={e=>setNewCustPhone(e.target.value)}
          style={{flex:'1 1 140px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <input
          placeholder={lang==='en'?'Email':'Barua pepe'}
          value={newCustEmail} onChange={e=>setNewCustEmail(e.target.value)}
          style={{flex:'1 1 180px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <input
          placeholder={lang==='en'?'Address':'Anwani'}
          value={newCustAddress} onChange={e=>setNewCustAddress(e.target.value)}
          style={{flex:'1 1 180px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <select
          value={newCustBranch} onChange={e=>setNewCustBranch(e.target.value)}
          style={{flex:'1 1 150px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'Select branch':'Chagua tawi'}</option>
          {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <div style={{flex:'1 1 140px',display:'flex',alignItems:'center',gap:'8px'}}>
          <input
            type="number" min="0" max="100"
            placeholder={lang==='en'?'Discount %':'Punguzo %'}
            value={newCustDiscount} onChange={e=>setNewCustDiscount(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
          />
        </div>
        <button onClick={addCustomer}
          style={{padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>
          {lang==='en'?'Add Customer':'Ongeza Mteja'}
        </button>
      </div>
    </div>

    {/* Search & Filter */}
    <div style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'16px',display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center'}}>
      <input
        placeholder={lang==='en'?'Search customer...':'Tafuta mteja...'}
        value={custSearch} onChange={e=>setCustSearch(e.target.value)}
        style={{flex:'1 1 200px',padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
      />
      <select value={custTypeFilter} onChange={e=>setCustTypeFilter(e.target.value)}
        style={{flex:'1 1 150px',padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
        <option value="">{lang==='en'?'All types':'Aina zote'}</option>
        <option value="Private School">{lang==='en'?'Private School':'Shule Binafsi'}</option>
        <option value="Government School">{lang==='en'?'Government School':'Shule ya Serikali'}</option>
        <option value="Hospital">{lang==='en'?'Hospital':'Hospitali'}</option>
        <option value="Company">{lang==='en'?'Company':'Kampuni'}</option>
        <option value="Government">{lang==='en'?'Government':'Serikali'}</option>
        <option value="Private">{lang==='en'?'Private':'Binafsi'}</option>
      </select>
      <span style={{fontSize:'13px',color:'#666'}}>
        {customers.filter(c=>
          (!custSearch || c.name.toLowerCase().includes(custSearch.toLowerCase()) || (c.phone||'').includes(custSearch)) &&
          (!custTypeFilter || c.type === custTypeFilter)
        ).length} {lang==='en'?'customers':'wateja'}
      </span>
    </div>

    {/* Customers Table */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Customers':'Wateja Wote'}</h3>
      {loadingCustomers ? (
        <p style={{color:'#666'}}>{lang==='en'?'Loading...':'Inapakia...'}</p>
      ) : customers.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px 0',color:'#999'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🤝</div>
          <div>{lang==='en'?'No customers yet':'Hakuna wateja bado'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Name':'Jina'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Type':'Aina'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Phone':'Simu'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Discount':'Punguzo'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Served By':'Aliyehudumia'}</th>
                <th style={{padding:'10px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter(c=>
                  (!custSearch || c.name.toLowerCase().includes(custSearch.toLowerCase()) || (c.phone||'').includes(custSearch)) &&
                  (!custTypeFilter || c.type === custTypeFilter)
                )
                .map(c => (
                <tr key={c.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  {editingCustomer === c.id ? (
                    <>
                      <td style={{padding:'8px'}}><input value={editCustName} onChange={e=>setEditCustName(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px',width:'100%'}}/></td>
                      <td style={{padding:'8px'}}>
                        <select value={editCustType} onChange={e=>setEditCustType(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px'}}>
                          <option value="Private School">{lang==='en'?'Private School':'Shule Binafsi'}</option>
                          <option value="Government School">{lang==='en'?'Government School':'Shule ya Serikali'}</option>
                          <option value="Hospital">{lang==='en'?'Hospital':'Hospitali'}</option>
                          <option value="Company">{lang==='en'?'Company':'Kampuni'}</option>
                          <option value="Government">{lang==='en'?'Government':'Serikali'}</option>
                          <option value="Private">{lang==='en'?'Private':'Binafsi'}</option>
                        </select>
                      </td>
                      <td style={{padding:'8px'}}><input value={editCustPhone} onChange={e=>setEditCustPhone(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px',width:'100%'}}/></td>
                      <td style={{padding:'8px'}}>
  <select value={editCustBranch} onChange={e=>setEditCustBranch(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px'}}>
    {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
  </select>
</td>
<td style={{padding:'8px'}}><input type="number" value={editCustDiscount} onChange={e=>setEditCustDiscount(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px',width:'70px'}}/></td>
<td style={{padding:'8px',fontSize:'13px',color:'#999'}}>
  {c.served_by_name || '-'}
</td>
<td style={{padding:'8px',textAlign:'right',whiteSpace:'nowrap'}}>

  {/* Save / Cancel buttons */}
</td>
                      <td style={{padding:'8px'}}><input type="number" value={editCustDiscount} onChange={e=>setEditCustDiscount(e.target.value)} style={{padding:'6px',border:'1px solid #ccc',borderRadius:'6px',width:'70px'}}/></td>
                      <td style={{padding:'8px',textAlign:'right',whiteSpace:'nowrap'}}>
                        <button onClick={()=>updateCustomer(c.id)} style={{background:'none',border:'none',color:'#15803d',cursor:'pointer',fontSize:'13px',marginRight:'8px'}}>{lang==='en'?'Save':'Hifadhi'}</button>
                        <button onClick={()=>setEditingCustomer(null)} style={{background:'none',border:'none',color:'#666',cursor:'pointer',fontSize:'13px'}}>{lang==='en'?'Cancel':'Ghairi'}</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{padding:'8px'}}>
                        <div style={{fontWeight:'600'}}>{c.name}</div>
                        <div style={{fontSize:'12px',color:'#666'}}>{c.email || ''}</div>
                      </td>
                      <td style={{padding:'8px'}}>
                        <span style={{
                          background: c.type==='School'?'#dbeafe':c.type==='Hospital'?'#dcfce7':c.type==='Government'?'#fef9c3':'#f3f4f6',
                          color: c.type==='School'?'#1d4ed8':c.type==='Hospital'?'#15803d':c.type==='Government'?'#854d0e':'#374151',
                          padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'
                        }}>
                          {c.type}
                        </span>
                      </td>
                      <td style={{padding:'8px'}}>{c.phone || '-'}</td>
                      <td style={{padding:'8px'}}>{c.branches?.name || '-'}</td>
                      <td style={{padding:'8px'}}>
  {c.discount_rate > 0 ? (
    <span style={{color:'#15803d',fontWeight:'600'}}>{c.discount_rate}%</span>
  ) : '-'}
</td>
<td style={{padding:'8px',fontSize:'13px',color:'#666'}}>
  {c.served_by_name || '-'}
</td>
                      <td style={{padding:'8px',textAlign:'right',whiteSpace:'nowrap'}}>
                        <button onClick={()=>{
                          setEditingCustomer(c.id);
                          setEditCustName(c.name);
                          setEditCustType(c.type);
                          setEditCustPhone(c.phone||'');
                          setEditCustEmail(c.email||'');
                          setEditCustAddress(c.address||'');
                          setEditCustBranch(c.branch_id);
                          setEditCustDiscount(c.discount_rate||'0');
                        }} style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px',marginRight:'8px'}}>
                          {lang==='en'?'Edit':'Hariri'}
                        </button>
                        <button onClick={()=>deleteCustomer(c.id)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'13px'}}>
                          {lang==='en'?'Delete':'Futa'}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}

{page === 'orders' && (
  <div>
    {/* Header Actions */}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
      <div style={{display:'flex',gap:'12px',flex:1,flexWrap:'wrap'}}>
        <input
          placeholder={lang==='en'?'Search order number or customer...':'Tafuta namba ya order au mteja...'}
          value={orderSearch} onChange={e=>setOrderSearch(e.target.value)}
          style={{flex:'1 1 250px',padding:'10px 14px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <select value={orderStatusFilter} onChange={e=>setOrderStatusFilter(e.target.value)}
          style={{padding:'10px 14px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'All statuses':'Hali zote'}</option>
          <option value="received">{lang==='en'?'Received':'Imepokelewa'}</option>
          <option value="processing">{lang==='en'?'Processing':'Inashughulikiwa'}</option>
          <option value="pending">{lang==='en'?'Pending Stock':'Inasubiri Stoo'}</option>
          <option value="ready">{lang==='en'?'Ready':'Iko Tayari'}</option>
          <option value="dispatched">{lang==='en'?'Dispatched':'Imetumwa'}</option>
          <option value="completed">{lang==='en'?'Completed':'Imekamilika'}</option>
          <option value="cancelled">{lang==='en'?'Cancelled':'Imefutwa'}</option>
        </select>
      </div>
      <button
  onClick={()=>{setShowNewOrder(true); setOrderItems([]); setEditingOrderId(null); setEditingItemTempId(null); setTimeout(loadOrderDraft, 100);}}
  style={{marginLeft:'12px',padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',whiteSpace:'nowrap'}}>
  + {lang==='en'?'New Order':'Order Mpya'}
</button>
    </div>

    {/* New Order Modal */}
{showNewOrder && (
  <div style={{position:'fixed',top:0,left:'180px',right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
    <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1500px',margin:'20px auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
            <h2 style={{margin:0,color:'#0a1628'}}>
  {editingOrderId ? '✏️' : '📦'} {editingOrderId ? (lang==='en'?'Edit Order':'Hariri Order') : (lang==='en'?'New Order':'Order Mpya')}
</h2>
<button onClick={()=>{setShowNewOrder(false); setEditingOrderId(null); setEditingItemTempId(null);}} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          {/* Customer & Branch */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
            <div style={{position:'relative'}}>
  <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
    {lang==='en'?'Customer *':'Mteja *'}
  </label>

  {selectedCustomer ? (
    // Chip inayoonyesha mteja aliyechaguliwa
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',border:'2px solid #0a1628',borderRadius:'8px',background:'#f9fafb'}}>
      <span style={{fontSize:'14px',fontWeight:'600'}}>
        {customers.find(c=>c.id===parseInt(selectedCustomer))?.name}
        {' '}
        <span style={{fontWeight:'400',color:'#666'}}>
          ({customers.find(c=>c.id===parseInt(selectedCustomer))?.type})
        </span>
      </span>
      <button
        onClick={()=>{setSelectedCustomer(''); setCustDropdownSearch(''); setShowCustDropdown(false);}}
        style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
        {lang==='en'?'Change':'Badilisha'}
      </button>
    </div>
  ) : (
    <>
      <input
        value={custDropdownSearch}
        onChange={e=>{setCustDropdownSearch(e.target.value); setShowCustDropdown(true);}}
        onFocus={()=>setShowCustDropdown(true)}
        placeholder={lang==='en'?'Search customer by name...':'Tafuta mteja kwa jina...'}
        style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
      />
      {showCustDropdown && (
        <div style={{
          position:'absolute',top:'100%',left:0,right:0,zIndex:50,
          background:'white',border:'2px solid #e5e7eb',borderRadius:'8px',
          marginTop:'4px',maxHeight:'220px',overflowY:'auto',
          boxShadow:'0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {customers
            .filter(c=>!custDropdownSearch || c.name.toLowerCase().includes(custDropdownSearch.toLowerCase()) || (c.phone||'').includes(custDropdownSearch))
            .length === 0 ? (
              <div style={{padding:'12px',fontSize:'13px',color:'#999',textAlign:'center'}}>
                {lang==='en'?'No customer found':'Hakuna mteja aliyepatikana'}
              </div>
            ) : customers
              .filter(c=>!custDropdownSearch || c.name.toLowerCase().includes(custDropdownSearch.toLowerCase()) || (c.phone||'').includes(custDropdownSearch))
              .map(c=>(
                <div key={c.id}
                  onClick={()=>{setSelectedCustomer(String(c.id)); setCustDropdownSearch(''); setShowCustDropdown(false);}}
                  style={{padding:'10px 12px',cursor:'pointer',borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                  onMouseLeave={e=>e.currentTarget.style.background='white'}>
                  <div style={{fontWeight:'600'}}>{c.name}</div>
                  <div style={{fontSize:'12px',color:'#666'}}>{c.type} {c.phone ? `• ${c.phone}` : ''}</div>
                </div>
              ))
          }
        </div>
      )}
    </>
  )}
</div>
            <div>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Branch *':'Tawi *'}
              </label>
              <select value={orderBranch} onChange={e=>setOrderBranch(e.target.value)}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
                <option value="">{lang==='en'?'Select branch':'Chagua tawi'}</option>
                {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          </div>

          {/* Order Items */}
<div style={{marginBottom:'20px'}}>
  <label style={{display:'block',marginBottom:'10px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
    {lang==='en'?'Order Items *':'Bidhaa za Order *'}
  </label>

  {/* Entry line - kuongeza item */}
  <div style={{display:'flex',gap:'8px',alignItems:'flex-end',marginBottom:'16px',padding:'14px',background:'#f9fafb',borderRadius:'8px',border:'1px dashed #d1d5db',flexWrap:'wrap'}}>

    {/* Type */}
    <div style={{width:'110px'}}>
      <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600'}}>{lang==='en'?'Type':'Aina'}</label>
      <select value={draftItemType}
        onChange={e=>{
  setDraftItemType(e.target.value);
  setDraftProductId(''); setDraftItemName(''); setDraftPrice('0'); setDraftCategory('');
  setDraftOnHand(null); setDraftOriginalPrice(null); setDraftDiscount('0');
}}
        style={{width:'100%',padding:'9px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box'}}>
        <option value="stock">{lang==='en'?'Stock':'Stoo'}</option>
        <option value="special">{lang==='en'?'Special':'Maalum'}</option>
      </select>
    </div>

    {/* Product / Item name - searchable, tegemea stock on hand */}
<div style={{flex:'1 1 190px',minWidth:'170px',position:'relative'}}>
  <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600'}}>
    {lang==='en'?'Item':'Bidhaa'}
  </label>

  {draftItemType === 'special' ? (
    <input
      placeholder={lang==='en'?'Item name (special order)':'Jina la bidhaa'}
      value={draftItemName}
      onChange={e=>setDraftItemName(e.target.value)}
      style={{width:'100%',padding:'9px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box'}}
    />
  ) : draftProductId ? (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px',border:'2px solid #0a1628',borderRadius:'8px',background:'white'}}>
      <span style={{fontSize:'13px',fontWeight:'600',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{draftItemName}</span>
      <button onClick={()=>{setDraftProductId('');setDraftItemName('');setDraftPrice('0');setDraftCategory('');setDraftOnHand(null);setDraftOriginalPrice(null);}}
        style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'12px',fontWeight:'600',marginLeft:'8px',flexShrink:0}}>
        {lang==='en'?'Change':'Badilisha'}
      </button>
    </div>
  ) : (
    <>
      <input
        value={prodDropdownSearch}
        onChange={e=>{setProdDropdownSearch(e.target.value); setShowProdDropdown(true);}}
        onFocus={()=>setShowProdDropdown(true)}
        placeholder={lang==='en'?'Search product...':'Tafuta bidhaa...'}
        style={{width:'100%',padding:'9px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box'}}
      />
      {showProdDropdown && (
        <div style={{
          position:'absolute',top:'100%',left:0,minWidth:'320px',zIndex:50,
          background:'white',border:'2px solid #e5e7eb',borderRadius:'8px',
          marginTop:'4px',maxHeight:'240px',overflowY:'auto',
          boxShadow:'0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {computeStockBalance()
            .filter((p:any)=>!prodDropdownSearch || p.name.toLowerCase().includes(prodDropdownSearch.toLowerCase()) || (p.category||'').toLowerCase().includes(prodDropdownSearch.toLowerCase()))
            .length === 0 ? (
              <div style={{padding:'12px',fontSize:'13px',color:'#999',textAlign:'center'}}>
                {lang==='en'?'No product found':'Hakuna bidhaa iliyopatikana'}
              </div>
            ) : computeStockBalance()
              .filter((p:any)=>!prodDropdownSearch || p.name.toLowerCase().includes(prodDropdownSearch.toLowerCase()) || (p.category||'').toLowerCase().includes(prodDropdownSearch.toLowerCase()))
              .map((p:any)=>(
                <div key={p.id}
                  onClick={()=>selectDraftProduct(p)}
                  style={{padding:'10px 12px',cursor:'pointer',borderBottom:'1px solid #f0f0f0',fontSize:'13px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                  onMouseLeave={e=>e.currentTarget.style.background='white'}>
                  <div>
                    <div style={{fontWeight:'600'}}>{p.name}</div>
                    <div style={{fontSize:'11px',color:'#666'}}>{p.category} • TSh {(p.unit_price||0).toLocaleString()}</div>
                  </div>
                  <span style={{
                    fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'10px',whiteSpace:'nowrap',
                    background:p.onHand<=0?'#fee2e2':p.onHand<10?'#fef9c3':'#dcfce7',
                    color:p.onHand<=0?'#dc2626':p.onHand<10?'#854d0e':'#15803d'
                  }}>
                    {p.onHand}
                  </span>
                </div>
              ))
          }
        </div>
      )}
    </>
  )}
</div>

{/* Status - onyesha stock on hand ya product aliyechaguliwa */}
<div style={{width:'110px'}}>
  <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600'}}>
    {lang==='en'?'Status':'Hali'}
  </label>
  <div style={{
    padding:'9px 8px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',textAlign:'center',
    border:'2px solid transparent',
    background: draftItemType==='special' ? '#f3f4f6' : draftOnHand===null ? '#f3f4f6' : draftOnHand<=0 ? '#fee2e2' : draftOnHand<10 ? '#fef9c3' : '#dcfce7',
    color: draftItemType==='special' ? '#9ca3af' : draftOnHand===null ? '#9ca3af' : draftOnHand<=0 ? '#dc2626' : draftOnHand<10 ? '#854d0e' : '#15803d'
  }}>
    {draftItemType==='special'
      ? (lang==='en'?'N/A':'Hakuna')
      : draftOnHand===null
        ? '-'
        : draftOnHand<=0
          ? (lang==='en'?'Out':'Imeisha')
          : `${draftOnHand} ${lang==='en'?'in stock':'zipo'}`}
  </div>
</div>

{/* Qty */}
<div style={{width:'70px'}}>
  <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600',textAlign:'right'}}>{lang==='en'?'Qty':'Idadi'}</label>
  <input type="number" min="1" value={draftQty}
    onChange={e=>setDraftQty(e.target.value)}
    style={{width:'100%',padding:'9px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'13px',textAlign:'right',boxSizing:'border-box'}}
  />
</div>

    {/* Unit Price */}
<div style={{width:'110px'}}>
  <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600',textAlign:'right'}}>{lang==='en'?'Price':'Bei'}</label>
  <input type="number" min="0" value={draftPrice}
    onChange={e=>handleDraftPriceChange(e.target.value)}
    style={{width:'100%',padding:'9px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'13px',textAlign:'right',boxSizing:'border-box'}}
  />
  {draftOriginalPrice !== null && draftOriginalPrice > 0 && (
    <div style={{fontSize:'10px',color:'#999',marginTop:'3px',textAlign:'right'}}>
      {lang==='en'?'Ref':'Rejea'}: TSh {draftOriginalPrice.toLocaleString()}
    </div>
  )}
</div>

    {/* Discount */}
<div style={{width:'80px'}}>
  <label style={{display:'block',marginBottom:'4px',fontSize:'11px',color:'#666',fontWeight:'600',textAlign:'right'}}>{lang==='en'?'Disc %':'Pun %'}</label>
  <input type="number" min="0" max="100" value={draftDiscount}
    readOnly={draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0}
    onChange={e=>setDraftDiscount(e.target.value)}
    style={{
      width:'100%',padding:'9px',borderRadius:'8px',fontSize:'13px',textAlign:'right',boxSizing:'border-box',
      border: (draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0) ? '2px solid #e5e7eb' : '2px solid #e5e7eb',
      background: (draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0) ? '#f3f4f6' : 'white',
      color: (draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0) ? '#15803d' : '#111',
      fontWeight: (draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0) ? '700' : '400',
      cursor: (draftItemType==='stock' && draftOriginalPrice !== null && draftOriginalPrice > 0) ? 'not-allowed' : 'text'
    }}
  />
</div>

    {/* Add / Update button */}
<div style={{display:'flex',gap:'6px'}}>
  <button onClick={addItemFromDraft}
    style={{padding:'9px 18px',background: editingItemTempId!==null ? '#1d4ed8' : '#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'bold',whiteSpace:'nowrap'}}>
    {editingItemTempId!==null ? `✓ ${lang==='en'?'Update':'Sasisha'}` : `+ ${lang==='en'?'Add':'Ongeza'}`}
  </button>
  {editingItemTempId!==null && (
    <button onClick={cancelEditItem}
      style={{padding:'9px 14px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
      {lang==='en'?'Cancel':'Ghairi'}
    </button>
  )}
</div>
  </div>

  {/* List ya vitu vilivyoongezwa */}
<div style={{marginTop:'4px'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
    <span style={{fontSize:'12px',fontWeight:'700',color:'#374151',textTransform:'uppercase',letterSpacing:'0.3px'}}>
      {lang==='en'?'Items in this order':'Bidhaa za order hii'}
    </span>
    {orderItems.length > 0 && (
      <span style={{fontSize:'12px',color:'#666'}}>
        {orderItems.length} {lang==='en'?'item(s)':'bidhaa'}
      </span>
    )}
  </div>

  {orderItems.length === 0 ? (
    <div style={{textAlign:'center',padding:'32px',background:'#f9fafb',borderRadius:'8px',color:'#999',border:'2px dashed #e5e7eb'}}>
      <div style={{fontSize:'32px',marginBottom:'6px'}}>🧺</div>
      <div style={{fontSize:'13px'}}>
        {lang==='en'?'No items added yet — fill the form above and click "Add"':'Hakuna bidhaa bado — jaza fomu hapo juu kisha bonyeza "Ongeza"'}
      </div>
    </div>
  ) : (
    <div style={{border:'1px solid #e5e7eb',borderRadius:'10px',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#0a1628'}}>
            <th style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>#</th>
            <th style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Item':'Bidhaa'}</th>
            <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Qty':'Idadi'}</th>
            <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Price':'Bei'}</th>
            <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Disc':'Pun'}</th>
            <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Total':'Jumla'}</th>
            <th style={{padding:'10px 8px',width:'32px'}}></th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, idx) => {
  const lineTotal = (item.quantity_requested * item.unit_price) * (1 - (item.discount/100));
  const isEditingThis = editingItemTempId === item.tempId;
  return (
    <tr key={item.tempId}
      onClick={()=>startEditItem(item)}
      style={{
        background: isEditingThis ? '#fef9c3' : (idx % 2 === 0 ? 'white' : '#f9fafb'),
        borderBottom:'1px solid #f0f0f0',
        cursor:'pointer'
      }}>
                <td style={{padding:'10px 12px',fontSize:'12px',color:'#999'}}>{idx + 1}</td>
                <td style={{padding:'10px 12px'}}>
                  <div style={{fontWeight:'600',fontSize:'13px',color:'#0a1628'}}>{item.item_name}</div>
                  {(item.quantity_supplied || 0) > 0 && (
  <div style={{fontSize:'11px',color:'#15803d',fontWeight:'600'}}>
    ✓ {lang==='en'?'Issued':'Imetolewa'}: {item.quantity_supplied}
  </div>
)}
                  <span style={{
                    display:'inline-block',marginTop:'2px',fontSize:'10px',padding:'1px 7px',borderRadius:'8px',fontWeight:'600',
                    background:item.item_type==='stock'?'#dbeafe':'#fef9c3',
                    color:item.item_type==='stock'?'#1d4ed8':'#854d0e'
                  }}>
                    {item.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
                  </span>
                </td>
                <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',fontWeight:'600'}}>{item.quantity_requested}</td>
                <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',color:'#374151'}}>TSh {Number(item.unit_price).toLocaleString()}</td>
                <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',color: item.discount>0 ? '#15803d' : '#9ca3af'}}>
                  {item.discount > 0 ? `${item.discount}%` : '-'}
                </td>
                <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',fontWeight:'700',color:'#0a1628'}}>
                  TSh {lineTotal.toLocaleString()}
                </td>
                <td style={{padding:'10px 8px',textAlign:'center'}}>
  <button onClick={(e)=>{e.stopPropagation(); removeOrderItem(item.tempId); if(isEditingThis && !(item.quantity_supplied>0)) cancelEditItem();}}
    title={lang==='en'?'Remove item':'Ondoa bidhaa'}
    style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'16px',lineHeight:1,padding:'2px'}}>×</button>
</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Summary footer */}
      {(() => {
        const grossTotal = orderItems.reduce((sum, item) => sum + (item.quantity_requested * item.unit_price), 0);
        const discountTotal = orderItems.reduce((sum, item) => {
          const subtotal = item.quantity_requested * item.unit_price;
          return sum + (subtotal * (item.discount / 100));
        }, 0);
        const netTotal = grossTotal - discountTotal;
        return (
          <div style={{padding:'14px 16px',background:'#f9fafb',borderTop:'2px solid #e5e7eb'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#666',marginBottom:'4px'}}>
              <span>{lang==='en'?'Subtotal':'Jumla ndogo'}</span>
              <span>TSh {grossTotal.toLocaleString()}</span>
            </div>
            {discountTotal > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#15803d',marginBottom:'4px'}}>
                <span>{lang==='en'?'Discount':'Punguzo'}</span>
                <span>− TSh {discountTotal.toLocaleString()}</span>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'8px',marginTop:'4px',borderTop:'1px solid #e5e7eb'}}>
              <span style={{fontWeight:'700',fontSize:'14px',color:'#0a1628'}}>{lang==='en'?'TOTAL':'JUMLA'}</span>
              <span style={{fontWeight:'800',fontSize:'19px',color:'#0a1628'}}>TSh {netTotal.toLocaleString()}</span>
            </div>
          </div>
        );
      })()}
    </div>
  )}
</div>

</div>

          {/* Notes */}
          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Notes':'Maelezo ya Ziada'}
            </label>
            <textarea value={orderNotes} onChange={e=>setOrderNotes(e.target.value)}
              placeholder={lang==='en'?'Any special instructions...':'Maelekezo maalum...'}
              rows={3}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',resize:'vertical',boxSizing:'border-box'}}
            />
          </div>

          {/* Actions */}
<div style={{display:'flex',gap:'12px',justifyContent:'space-between',alignItems:'center'}}>
  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
    <button onClick={()=>saveOrderDraft()}
  disabled={draftSaving}
      style={{padding:'12px 20px',background:'white',color:'#0a1628',border:'2px solid #c9a84c',borderRadius:'8px',cursor:draftSaving?'not-allowed':'pointer',fontWeight:'bold',display:'flex',alignItems:'center',gap:'6px'}}>
      💾 {draftSaving ? (lang==='en'?'Saving...':'Inahifadhi...') : (lang==='en'?'Save Draft':'Hifadhi Muswada')}
    </button>
    {draftSavedAt && (
  <span style={{fontSize:'11px',color:'#15803d',fontWeight:'600',display:'flex',alignItems:'center',gap:'4px'}}>
    <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#15803d',display:'inline-block'}}></span>
    {lang==='en'?'Auto-saved':'Imehifadhiwa kiotomatiki'} {new Date(draftSavedAt).toLocaleTimeString()}
  </span>
)}
  </div>

  <div style={{display:'flex',gap:'12px'}}>
    <button onClick={()=>{setShowNewOrder(false); setEditingOrderId(null); setEditingItemTempId(null);}}
  style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
  {lang==='en'?'Cancel':'Ghairi'}
</button>
<button onClick={submitOrder}
  style={{padding:'12px 24px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
  {editingOrderId ? (lang==='en'?'Update Order':'Sasisha Order') : (lang==='en'?'Submit Order':'Wasilisha Order')}
</button>
  </div>
</div>
</div>
</div>
    )}

    {/* Orders List */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>
        {lang==='en'?'All Orders':'Orders Zote'}
        <span style={{marginLeft:'8px',fontSize:'14px',color:'#666',fontWeight:'normal'}}>
          ({orders.filter(o=>
            (!orderSearch || o.order_number?.includes(orderSearch) || o.customers?.name?.toLowerCase().includes(orderSearch.toLowerCase())) &&
            (!orderStatusFilter || o.status === orderStatusFilter)
          ).length})
        </span>
      </h3>

      {loadingOrders ? (
        <p style={{color:'#666'}}>{lang==='en'?'Loading...':'Inapakia...'}</p>
      ) : orders.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#999'}}>
          <div style={{fontSize:'56px',marginBottom:'12px'}}>📭</div>
          <div style={{fontSize:'16px',marginBottom:'8px'}}>{lang==='en'?'No orders yet':'Hakuna orders bado'}</div>
          <div style={{fontSize:'13px'}}>{lang==='en'?'Click "New Order" to create your first order':'Bonyeza "Order Mpya" kuunda order yako ya kwanza'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'800px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Order #':'Namba'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Items':'Bidhaa'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Total':'Jumla'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
                <th style={{padding:'10px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(o=>
                  (!orderSearch || o.order_number?.includes(orderSearch) || o.customers?.name?.toLowerCase().includes(orderSearch.toLowerCase())) &&
                  (!orderStatusFilter || o.status === orderStatusFilter)
                )
                .map(o => {
                  const statusColors: any = {
                    received: {bg:'#dbeafe',color:'#1d4ed8'},
                    processing: {bg:'#fef9c3',color:'#854d0e'},
                    pending: {bg:'#fee2e2',color:'#dc2626'},
                    ready: {bg:'#d1fae5',color:'#065f46'},
                    dispatched: {bg:'#e0e7ff',color:'#3730a3'},
                    completed: {bg:'#dcfce7',color:'#15803d'},
                    cancelled: {bg:'#f3f4f6',color:'#6b7280'},
                  };
                  const sc = statusColors[o.status] || {bg:'#f3f4f6',color:'#666'};
                  const statusLabels: any = {
                    received: lang==='en'?'Received':'Imepokelewa',
                    processing: lang==='en'?'Processing':'Inashughulikiwa',
                    pending: lang==='en'?'Pending':'Inasubiri',
                    ready: lang==='en'?'Ready':'Tayari',
                    dispatched: lang==='en'?'Dispatched':'Imetumwa',
                    completed: lang==='en'?'Completed':'Imekamilika',
                    cancelled: lang==='en'?'Cancelled':'Imefutwa',
                  };
                  return (
                    <tr key={o.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{fontWeight:'700',color:'#0a1628',fontFamily:'monospace'}}>{o.order_number}</span>
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <div style={{fontWeight:'600'}}>{o.customers?.name}</div>
                        <div style={{fontSize:'12px',color:'#666'}}>{o.customers?.type}</div>
                      </td>
                      <td style={{padding:'10px 8px'}}>{o.branches?.name || '-'}</td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {o.order_items?.length || 0} {lang==='en'?'items':'bidhaa'}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>
                        TSh {(o.total_amount||0).toLocaleString()}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <select
                          value={o.status}
                          onChange={e=>updateOrderStatus(o.id, e.target.value)}
                          style={{
                            background:sc.bg,color:sc.color,
                            border:'none',borderRadius:'12px',
                            padding:'4px 8px',fontSize:'12px',
                            fontWeight:'600',cursor:'pointer'
                          }}>
                          {Object.entries(statusLabels).map(([k,v])=>(
                            <option key={k} value={k}>{v as string}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                      <td style={{padding:'10px 8px'}}>
  <button onClick={()=>setViewingOrder(o)}
    style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px',marginRight:'8px'}}>
    {lang==='en'?'View':'Ona'}
  </button>
  <button onClick={()=>openEditOrder(o)}
    style={{background:'none',border:'none',color:'#c9a84c',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
    {lang==='en'?'Edit':'Hariri'}
  </button>
</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* View Order Modal */}
{viewingOrder && (
  <div style={{position:'fixed',top:0,left:'180px',right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
    <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'95%',maxWidth:'1500px',margin:'20px auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'}}>
            <div>
              <h2 style={{margin:'0 0 4px',color:'#0a1628'}}>Order {viewingOrder.order_number}</h2>
              <p style={{margin:0,color:'#666',fontSize:'13px'}}>{new Date(viewingOrder.created_at).toLocaleString()}</p>
            </div>
            <button onClick={()=>setViewingOrder(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
            <div style={{background:'#f9fafb',padding:'16px',borderRadius:'8px'}}>
              <div style={{fontSize:'12px',color:'#666',marginBottom:'4px'}}>{lang==='en'?'Customer':'Mteja'}</div>
              <div style={{fontWeight:'700',fontSize:'16px'}}>{viewingOrder.customers?.name}</div>
              <div style={{fontSize:'13px',color:'#666'}}>{viewingOrder.customers?.type}</div>
            </div>
            <div style={{background:'#f9fafb',padding:'16px',borderRadius:'8px'}}>
              <div style={{fontSize:'12px',color:'#666',marginBottom:'4px'}}>{lang==='en'?'Branch':'Tawi'}</div>
              <div style={{fontWeight:'700',fontSize:'16px'}}>{viewingOrder.branches?.name}</div>
            </div>
          </div>

          <div style={{marginBottom:'20px'}}>
            <h4 style={{margin:'0 0 12px',color:'#0a1628'}}>{lang==='en'?'Order Items':'Bidhaa za Order'}</h4>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f9fafb',fontSize:'12px',color:'#666'}}>
                  <th style={{padding:'8px',textAlign:'left'}}>#</th>
                  <th style={{padding:'8px',textAlign:'left'}}>{lang==='en'?'Item':'Bidhaa'}</th>
                  <th style={{padding:'8px',textAlign:'left'}}>{lang==='en'?'Type':'Aina'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Qty':'Idadi'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Price':'Bei'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Disc':'Pun'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Total':'Jumla'}</th>
                </tr>
              </thead>
              <tbody>
                {(viewingOrder.order_items||[]).map((item: any, idx: number) => (
                  <tr key={item.id} style={{borderTop:'1px solid #f0f0f0',fontSize:'14px'}}>
                    <td style={{padding:'8px',color:'#666'}}>{idx+1}</td>
                    <td style={{padding:'8px',fontWeight:'600'}}>{item.item_name}</td>
                    <td style={{padding:'8px'}}>
                      <span style={{
                        background: item.item_type==='stock'?'#dbeafe':'#fef9c3',
                        color: item.item_type==='stock'?'#1d4ed8':'#854d0e',
                        padding:'2px 8px',borderRadius:'12px',fontSize:'12px'
                      }}>
                        {item.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
                      </span>
                    </td>
                    <td style={{padding:'8px',textAlign:'right'}}>{item.quantity_requested}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>TSh {(item.unit_price||0).toLocaleString()}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>{item.discount||0}%</td>
                    <td style={{padding:'8px',textAlign:'right',fontWeight:'700'}}>TSh {(item.total_price||0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{background:'#f9fafb',fontWeight:'bold'}}>
                  <td colSpan={6} style={{padding:'12px 8px',textAlign:'right',color:'#0a1628'}}>TOTAL:</td>
                  <td style={{padding:'12px 8px',textAlign:'right',color:'#0a1628',fontSize:'16px'}}>
                    TSh {(viewingOrder.total_amount||0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {viewingOrder.notes && (
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px',marginBottom:'20px'}}>
              <div style={{fontSize:'12px',color:'#666',marginBottom:'4px'}}>{lang==='en'?'Notes':'Maelezo'}</div>
              <div style={{fontSize:'14px'}}>{viewingOrder.notes}</div>
            </div>
          )}

          <div style={{display:'flex',justifyContent:'flex-end',gap:'12px'}}>
            <button onClick={()=>setViewingOrder(null)}
              style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Close':'Funga'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{page === 'stock' && (() => {
  // Bidhaa zote zilizosajiliwa (kwa tab ya Registered)
  const effBranch = currentUser?.role_name === 'Store Keeper' ? currentUser.branch_id : (stockBranchFilter || undefined);
  // Tawi la admin (Store Keeper hutumia effBranch, tawi lake)
const adminBranch = effBranch ? String(effBranch) : '';

// Movements za tawi husika tu
const branchMovements = stockMovements.filter((m:any) =>
  !effBranch || String(m.branch_id) === String(effBranch)
);

// Transfers: zinazotoka au kuingia kwenye tawi husika
const visibleTransfers = stockRequests.filter((r:any) =>
  !adminBranch ||
  String(r.from_branch_id) === String(adminBranch) ||
  String(r.to_branch_id) === String(adminBranch)
);
const registeredList = computeStockBalance(effBranch).filter(p =>
  !stockSearch || p.name.toLowerCase().includes(stockSearch.toLowerCase())
);

// Bidhaa zilizowahi kurekodiwa Stock In tu (kwa tab ya Stock on Hand)
const stockList = registeredList.filter((p: any) => p.in > 0);
  const pendingRequests = orders.filter(o =>
  isActiveRequest(o) && (!adminBranch || String(o.branch_id) === String(adminBranch))
);
  const stockAll = computeStockBalance();

  const movementLabels: any = {
    in: lang==='en'?'Stock In':'Stoo Imeingia',
    out: lang==='en'?'Stock Out':'Stoo Imetoka',
    expired: lang==='en'?'Expired':'Imeisha Muda',
    damaged: lang==='en'?'Damaged':'Imeharibika'
  };
  const modalTitles: any = {
    in: lang==='en'?'Record Stock In':'Rekodi Stoo Kuingia',
    out: lang==='en'?'Record Stock Out':'Rekodi Stoo Kutoka',
    expired: lang==='en'?'Record Expired Stock':'Rekodi Stoo Iliyoisha Muda',
    damaged: lang==='en'?'Record Damaged Stock':'Rekodi Stoo Iliyoharibika'
  };
  
  return (
    <div>
      <div style={{marginBottom:'14px',display:'inline-flex',alignItems:'center',gap:'8px',background:'white',padding:'8px 14px',borderRadius:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',fontSize:'13px',fontWeight:'600',color:'#0a1628'}}>
  🏢 {currentUser?.role_name === 'Store Keeper'
    ? currentUser.branch_name
    : stockBranchFilter
      ? branches.find(b => String(b.id) === stockBranchFilter)?.name
      : (lang==='en' ? 'All Branches' : 'Matawi Yote')}
</div>

      {/* Tabs */}
<div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap',alignItems:'center'}}>
  {[
    {key:'onhand',icon:'📦',label:lang==='en'?'Stock on Hand':'Stoo Iliyopo'},
    {key:'in',icon:'⬇️',label:lang==='en'?'Stock In':'Stoo Kuingia'},
    {key:'out',icon:'⬆️',label:lang==='en'?'Stock Out':'Stoo Kutoka'},
    {key:'expired',icon:'⚠️',label:lang==='en'?'Expired/Damaged':'Imeisha/Imeharibika'},
    {key:'requests',icon:'📥',label:lang==='en'?'Order Requests':'Maombi ya Orders'},
    {key:'transfers',icon:'🔄',label:lang==='en'?'Transfer Requests':'Maombi ya Uhamisho'},
    {key:'registered',icon:'🗂️',label:lang==='en'?'Registered Items':'Bidhaa Zilizosajiliwa'},
  ].map(t=>(
    <button key={t.key} onClick={()=>setStockTab(t.key)}
      style={{padding:'10px 20px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:'600',
        background:stockTab===t.key?'#0a1628':'white',
        color:stockTab===t.key?'white':'#374151',
        boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      {t.icon} {t.label}
      {t.key==='requests' && pendingRequests.length>0 && (
        <span style={{marginLeft:'8px',background:'#ef4444',color:'white',borderRadius:'10px',padding:'1px 7px',fontSize:'11px'}}>{pendingRequests.length}</span>
      )}
      {t.key==='transfers' && visibleTransfers.filter(r=>r.status==='pending').length>0 && (
  <span style={{marginLeft:'8px',background:'#ef4444',color:'white',borderRadius:'10px',padding:'1px 7px',fontSize:'11px'}}>
    {visibleTransfers.filter(r=>r.status==='pending').length}
  </span>
)}
    </button>
  ))}

  {/* REGISTER ITEM - mwisho kabisa */}
 {/* REGISTER ITEM - mwisho kabisa */}
<button onClick={()=>setShowRegisterItem(true)}
  style={{marginLeft:'auto',padding:'10px 20px',borderRadius:'8px',border:'2px solid #c9a84c',cursor:'pointer',fontSize:'13px',fontWeight:'700',
    background:'#c9a84c',color:'white',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
  ➕ {lang==='en'?'Register Item':'Sajili Bidhaa'}
</button>
</div>

      {/* Stock Movement Modal */}
      {stockModalType && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
          <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'520px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <h2 style={{margin:0,color:'#0a1628'}}>{modalTitles[stockModalType]}</h2>
              <button onClick={()=>setStockModalType('')} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
            </div>

            <div style={{marginBottom:'16px',position:'relative'}}>
  <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
    {lang==='en'?'Product *':'Bidhaa *'}
  </label>

  {stkProduct ? (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',border:'2px solid #0a1628',borderRadius:'8px',background:'#f9fafb'}}>
      <span style={{fontSize:'14px',fontWeight:'600'}}>
        {products.find(p=>String(p.id)===String(stkProduct))?.name}
        <span style={{fontWeight:'400',color:'#666',marginLeft:'6px'}}>
          ({lang==='en'?'On hand':'Iliyopo'}: {computeStockBalance().find((p:any)=>String(p.id)===String(stkProduct))?.onHand ?? 0})
        </span>
      </span>
      <button onClick={()=>{setStkProduct(''); setStkProductSearch('');}}
        style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
        {lang==='en'?'Change':'Badilisha'}
      </button>
    </div>
  ) : (
    <>
      <input
        value={stkProductSearch}
        onChange={e=>{setStkProductSearch(e.target.value); setShowStkProdDropdown(true);}}
        onFocus={()=>setShowStkProdDropdown(true)}
        placeholder={lang==='en'?'Search registered item...':'Tafuta bidhaa iliyosajiliwa...'}
        style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
      />
      {showStkProdDropdown && (() => {
        const list = computeStockBalance().filter((p:any) =>
          !stkProductSearch ||
          p.name.toLowerCase().includes(stkProductSearch.toLowerCase()) ||
          (p.category||'').toLowerCase().includes(stkProductSearch.toLowerCase())
        );
        return (
          <div style={{position:'absolute',top:'100%',left:0,right:0,zIndex:50,background:'white',border:'2px solid #e5e7eb',borderRadius:'8px',marginTop:'4px',maxHeight:'220px',overflowY:'auto',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
            {list.length === 0 ? (
              <div style={{padding:'12px',fontSize:'13px',color:'#999',textAlign:'center'}}>
                {lang==='en'?'No registered item found. Use "Register Item" first.':'Hakuna bidhaa. Tumia "Sajili Bidhaa" kwanza.'}
              </div>
            ) : list.map((p:any)=>(
              <div key={p.id}
                onClick={()=>{setStkProduct(String(p.id)); setStkProductSearch(''); setShowStkProdDropdown(false);}}
                style={{padding:'10px 12px',cursor:'pointer',borderBottom:'1px solid #f0f0f0',fontSize:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}
                onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                onMouseLeave={e=>e.currentTarget.style.background='white'}>
                <div>
                  <div style={{fontWeight:'600'}}>{p.name}</div>
                  <div style={{fontSize:'11px',color:'#666'}}>{p.category || '-'} {p.unit ? `• ${p.unit}` : ''}</div>
                </div>
                <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'10px',whiteSpace:'nowrap',
                  background:p.onHand<=0?'#fee2e2':p.onHand<10?'#fef9c3':'#dcfce7',
                  color:p.onHand<=0?'#dc2626':p.onHand<10?'#854d0e':'#15803d'}}>
                  {p.onHand}
                </span>
              </div>
            ))}
          </div>
        );
      })()}
    </>
  )}
</div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
              <div>
                <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                  {lang==='en'?'Quantity *':'Idadi *'}
                </label>
                <input type="number" min="0" value={stkQty} onChange={e=>setStkQty(e.target.value)}
                  style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
                />
              </div>
              <div>
                <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                  {lang==='en'?'Branch':'Tawi'}
                </label>
                <select value={stkBranch} onChange={e=>setStkBranch(e.target.value)}
                  style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
                  <option value="">{lang==='en'?'Select branch':'Chagua tawi'}</option>
                  {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Reference (PO#, Supplier...)':'Marejeleo (PO#, Muuzaji...)'}
              </label>
              <input value={stkReference} onChange={e=>setStkReference(e.target.value)}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>

            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Notes':'Maelezo'}
              </label>
              <textarea value={stkNotes} onChange={e=>setStkNotes(e.target.value)} rows={2}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box',resize:'vertical'}}
              />
            </div>

            <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
              <button onClick={()=>setStockModalType('')}
                style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
                {lang==='en'?'Cancel':'Ghairi'}
              </button>
              <button onClick={submitStockMovement}
                style={{padding:'12px 24px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
                ✓ {lang==='en'?'Save':'Hifadhi'}
              </button>
            </div>
          </div>
        </div>
      )}

{/* Transfer Item Modal */}
{showNewTransfer && (
  <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
    <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h2 style={{margin:0,color:'#0a1628'}}>🔄 {lang==='en'?'Request Stock':'Omba Bidhaa Tawi Lingine'}</h2>
        <button onClick={()=>setShowNewTransfer(false)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
      </div>

      <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px'}}>{lang==='en'?'Product *':'Bidhaa *'}</label>
      <select value={trfProduct} onChange={e=>setTrfProduct(e.target.value)}
        style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',marginBottom:'14px'}}>
        <option value="">{lang==='en'?'Select product':'Chagua bidhaa'}</option>
        {products.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'14px'}}>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px'}}>{lang==='en'?'Quantity *':'Idadi *'}</label>
          <input type="number" min="1" value={trfQty} onChange={e=>setTrfQty(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
        </div>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px'}}>{lang==='en'?'My branch *':'Tawi langu *'}</label>
          <select value={trfToBranch} onChange={e=>setTrfToBranch(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
            <option value="">-</option>
            {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px'}}>{lang==='en'?'Request from *':'Omba kutoka *'}</label>
          <select value={trfFromBranch} onChange={e=>setTrfFromBranch(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
            <option value="">-</option>
            {branches.filter(b=>String(b.id)!==trfToBranch).map(b=>{
              const bal = trfProduct ? computeStockBalance(b.id).find((p:any)=>String(p.id)===trfProduct)?.onHand ?? 0 : null;
              return <option key={b.id} value={b.id}>{b.name}{bal!==null ? ` (${bal})` : ''}</option>;
            })}
          </select>
        </div>
      </div>

      <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px'}}>{lang==='en'?'Send request to':'Tuma ombi kwa'}</label>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'14px'}}>
        {[
          {key:'branch',label:lang==='en'?'Branch Store Keeper':'Store Keeper wa tawi'},
          {key:'staff',label:lang==='en'?'Specific staff':'Mfanyakazi maalum'},
          {key:'admin',label:'Admin / Director'},
        ].map(t=>(
          <div key={t.key} onClick={()=>setTrfTargetType(t.key)}
            style={{padding:'10px 6px',border:`2px solid ${trfTargetType===t.key?'#0a1628':'#e5e7eb'}`,borderRadius:'8px',cursor:'pointer',textAlign:'center',fontSize:'12px',fontWeight:'600',
              background:trfTargetType===t.key?'#0a1628':'white',color:trfTargetType===t.key?'white':'#374151'}}>
            {t.label}
          </div>
        ))}
      </div>

      {trfTargetType==='staff' && (
        <select value={trfTargetUser} onChange={e=>setTrfTargetUser(e.target.value)}
          style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',marginBottom:'14px'}}>
          <option value="">{lang==='en'?'Select staff':'Chagua mfanyakazi'}</option>
          {staff.map(s=><option key={s.id} value={s.id}>{s.full_name} — {s.roles?.name||'-'} — {s.branches?.name||'-'}</option>)}
        </select>
      )}

      <textarea value={trfNotes} onChange={e=>setTrfNotes(e.target.value)} rows={2}
        placeholder={lang==='en'?'Notes (optional)':'Maelezo (si lazima)'}
        style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box',resize:'vertical',marginBottom:'20px'}} />

      <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
        <button onClick={()=>setShowNewTransfer(false)}
          style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
          {lang==='en'?'Cancel':'Ghairi'}
        </button>
        <button onClick={submitStockRequest}
          style={{padding:'12px 24px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
          {lang==='en'?'Send Request':'Tuma Ombi'}
        </button>
      </div>
    </div>
  </div>
)}

{/* Register Item Modal */}
{showRegisterItem && (
  <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
    <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h2 style={{margin:0,color:'#0a1628'}}>➕ {lang==='en'?'Register Item':'Sajili Bidhaa'}</h2>
        <button onClick={()=>setShowRegisterItem(false)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
      </div>

      <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'8px',padding:'10px 12px',marginBottom:'16px',fontSize:'12px',color:'#1e40af'}}>
        {lang==='en'
          ? 'Register the item name only. Quantity is added later through Stock In.'
          : 'Sajili jina la bidhaa tu. Idadi inaongezwa baadaye kupitia Stock In.'}
      </div>

      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
          {lang==='en'?'Item Name *':'Jina la Bidhaa *'}
        </label>
        <input value={regItemName} onChange={e=>setRegItemName(e.target.value)} autoFocus
          onKeyDown={e=>e.key==='Enter' && registerItem()}
          style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
        />
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
            {lang==='en'?'Category':'Kundi'}
          </label>
          <input value={regItemCategory} onChange={e=>setRegItemCategory(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
          />
        </div>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
            {lang==='en'?'Unit (pcs, box...)':'Kipimo (pcs, box...)'}
          </label>
          <input value={regItemUnit} onChange={e=>setRegItemUnit(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
          />
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
            {lang==='en'?'Type':'Aina'}
          </label>
          <select value={regItemType} onChange={e=>setRegItemType(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
            <option value="stock">{lang==='en'?'Stock':'Stoo'}</option>
            <option value="special">{lang==='en'?'Special':'Maalum'}</option>
          </select>
        </div>
        <div>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
            {lang==='en'?'Reference Price (TSh)':'Bei ya Rejea (TSh)'}
          </label>
          <input type="number" min="0" value={regItemPrice} onChange={e=>setRegItemPrice(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
          />
        </div>
      </div>

      <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
        <button onClick={()=>setShowRegisterItem(false)}
          style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
          {lang==='en'?'Cancel':'Ghairi'}
        </button>
        <button onClick={registerItem} disabled={registeringItem}
          style={{padding:'12px 24px',background:registeringItem?'#9ca3af':'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:registeringItem?'not-allowed':'pointer',fontWeight:'bold'}}>
          ✓ {registeringItem ? '...' : (lang==='en'?'Register':'Sajili')}
        </button>
      </div>
    </div>
  </div>
)}

{/* Edit Stock In Modal */}
{editingMovement && (() => {
  const base = parseFloat(editMvQty) || 0;
  const extra = parseFloat(editMvAdd) || 0;
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'520px',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h2 style={{margin:0,color:'#0a1628'}}>✏️ {lang==='en'?'Edit Stock In':'Hariri Stock In'}</h2>
          <button onClick={()=>setEditingMovement(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
        </div>

        <div style={{background:'#f9fafb',borderRadius:'8px',padding:'12px',marginBottom:'16px'}}>
          <div style={{fontSize:'11px',color:'#666'}}>{lang==='en'?'Item':'Bidhaa'}</div>
          <div style={{fontWeight:'700',fontSize:'15px',color:'#0a1628'}}>{editingMovement.products?.name || '-'}</div>
        </div>

        <div style={{marginBottom:'16px'}}>
  <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
    {lang==='en'?'Quantity (correction only)':'Idadi (kusahihisha tu)'}
  </label>
  <input type="number" min="0" value={editMvQty} onChange={e=>setEditMvQty(e.target.value)}
    style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
  <button onClick={()=>openAddMoreStock(editingMovement.product_id, editingMovement.branch_id)}
    style={{marginTop:'8px',background:'none',border:'none',color:'#15803d',cursor:'pointer',fontSize:'13px',fontWeight:'700',padding:0}}>
    + {lang==='en'?'Received more? Record new Stock In':'Mzigo mpya umeingia? Rekodi Stock In mpya'}
  </button>
</div>

        <div style={{marginBottom:'14px'}}>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Branch':'Tawi'}</label>
          <select value={editMvBranch} onChange={e=>setEditMvBranch(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
            <option value="">{lang==='en'?'Select branch':'Chagua tawi'}</option>
            {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div style={{marginBottom:'14px'}}>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Reference':'Marejeleo'}</label>
          <input value={editMvReference} onChange={e=>setEditMvReference(e.target.value)}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Notes':'Maelezo'}</label>
          <textarea value={editMvNotes} onChange={e=>setEditMvNotes(e.target.value)} rows={2}
            style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box',resize:'vertical'}} />
        </div>

        <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
          <button onClick={()=>setEditingMovement(null)}
            style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
            {lang==='en'?'Cancel':'Ghairi'}
          </button>
          <button onClick={updateStockMovement} disabled={savingMovement}
            style={{padding:'12px 24px',background:savingMovement?'#9ca3af':'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:savingMovement?'not-allowed':'pointer',fontWeight:'bold'}}>
            ✓ {savingMovement ? '...' : (lang==='en'?'Save':'Hifadhi')}
          </button>
        </div>
      </div>
    </div>
  );
})()}

{/* Edit History Modal */}
{historyFor && (
  <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}
    onClick={()=>setHistoryFor(null)}>
    <div onClick={e=>e.stopPropagation()}
      style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'640px',maxHeight:'85vh',overflowY:'auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
        <h2 style={{margin:0,color:'#0a1628',fontSize:'18px'}}>
          🕘 {lang==='en'?'Edit History':'Historia ya Mabadiliko'} — {historyFor.products?.name}
        </h2>
        <button onClick={()=>setHistoryFor(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
      </div>

      {historyRows.length === 0 ? (
        <p style={{color:'#999',textAlign:'center',padding:'20px'}}>{lang==='en'?'Loading...':'Inapakia...'}</p>
      ) : historyRows.map((h:any)=>{
        const brName = (id:any)=>branches.find(b=>b.id===id)?.name || '-';
        return (
          <div key={h.id} style={{border:'1px solid #e5e7eb',borderRadius:'10px',padding:'12px',marginBottom:'10px',fontSize:'13px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
              <strong style={{color:'#0a1628'}}>{h.edited_by_name || '-'}</strong>
              <span style={{color:'#999',fontSize:'12px'}}>{new Date(h.created_at).toLocaleString()}</span>
            </div>
            {Number(h.old_quantity) !== Number(h.new_quantity) && (
              <div>📦 {lang==='en'?'Quantity':'Idadi'}: <span style={{color:'#dc2626'}}>{h.old_quantity}</span> → <b style={{color:'#15803d'}}>{h.new_quantity}</b></div>
            )}
            {h.old_branch_id !== h.new_branch_id && (
              <div>🏢 {lang==='en'?'Branch':'Tawi'}: {brName(h.old_branch_id)} → <b>{brName(h.new_branch_id)}</b></div>
            )}
            {(h.old_reference||'') !== (h.new_reference||'') && (
              <div>🔖 {lang==='en'?'Reference':'Marejeleo'}: {h.old_reference||'-'} → <b>{h.new_reference||'-'}</b></div>
            )}
            {(h.old_notes||'') !== (h.new_notes||'') && (
              <div>📝 {lang==='en'?'Notes':'Maelezo'}: {h.old_notes||'-'} → <b>{h.new_notes||'-'}</b></div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

      {/* STOCK ON HAND */}
      {stockTab === 'onhand' && (
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'12px'}}>
            <h3 style={{margin:0,color:'#0a1628'}}>{lang==='en'?'Stock on Hand':'Stoo Iliyopo'}</h3>
            <div style={{display:'flex',gap:'8px'}}>
              <input placeholder={lang==='en'?'Search item...':'Tafuta bidhaa...'}
                value={stockSearch} onChange={e=>setStockSearch(e.target.value)}
                style={{padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
              />
              <button onClick={()=>setStockModalType('in')}
                style={{padding:'8px 16px',background:'#15803d',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                + {lang==='en'?'Stock In':'Ingiza'}
              </button>
              <button onClick={()=>setStockModalType('out')}
                style={{padding:'8px 16px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                − {lang==='en'?'Stock Out':'Toa'}
              </button>
            </div>
          </div>
          {stockList.length === 0 ? (
            <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
              <div style={{fontSize:'48px',marginBottom:'8px'}}>📦</div>
              <div>{lang==='en'?'No stock recorded yet. Use "Stock In" to add items.':'Hakuna stoo iliyorekodiwa bado. Tumia "Ingiza" kuongeza bidhaa.'}</div>
            </div>
          ) : (
           <div style={{overflowX:'auto'}}>
  <table style={{width:'100%',borderCollapse:'collapse',minWidth:'800px'}}>
    <thead>
      <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
        <th style={{padding:'10px 8px'}}>#</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Item Name':'Jina la Bidhaa'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Category':'Kundi'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Type':'Aina'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Unit':'Kipimo'}</th>
        <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Ref. Price':'Bei ya Rejea'}</th>
        <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'On Hand':'Iliyopo'}</th>
        <th style={{padding:'10px 8px'}}></th>
      </tr>
    </thead>
    <tbody>
      {stockList.map((p:any, idx:number) => (
        <tr key={p.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
          <td style={{padding:'10px 8px',color:'#999',fontSize:'12px'}}>{idx+1}</td>
          <td style={{padding:'10px 8px',fontWeight:'600'}}>{p.name}</td>
          <td style={{padding:'10px 8px'}}>{p.category || '-'}</td>
          <td style={{padding:'10px 8px'}}>
            <span style={{
              fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'600',
              background:p.item_type==='stock'?'#dbeafe':'#fef9c3',
              color:p.item_type==='stock'?'#1d4ed8':'#854d0e'
            }}>
              {p.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
            </span>
          </td>
          <td style={{padding:'10px 8px'}}>{p.unit || '-'}</td>
          <td style={{padding:'10px 8px',textAlign:'right'}}>TSh {(p.unit_price||0).toLocaleString()}</td>
          <td style={{padding:'10px 8px',textAlign:'right',fontWeight:'700',
            color:p.onHand<=0?'#dc2626':p.onHand<10?'#b45309':'#15803d'}}>
            {p.onHand} 
          </td>
          <td style={{padding:'10px 8px',textAlign:'right'}}>
  <button onClick={()=>openAddMoreStock(p.id, effBranch)}
    style={{background:'none',border:'none',color:'#15803d',cursor:'pointer',fontSize:'13px',fontWeight:'700'}}>
    + {lang==='en'?'Add Stock':'Ongeza'}
  </button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          )}
        </div>
      )}

{/* ORDER REQUESTS - kwa store keeper */}
{stockTab === 'requests' && (
  <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
    <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>
      {lang==='en'?'Order Requests':'Maombi ya Orders'}
      <span style={{marginLeft:'8px',fontSize:'14px',color:'#666',fontWeight:'normal'}}>({pendingRequests.length})</span>
    </h3>
    {pendingRequests.filter(hasUnackChanges).length > 0 && (
  <div style={{background:'#fef3c7',border:'2px solid #f59e0b',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'}}>
    <span style={{fontSize:'22px'}}>🔔</span>
    <div style={{fontSize:'13px',color:'#92400e',fontWeight:'700'}}>
      {pendingRequests.filter(hasUnackChanges).length} {lang==='en'
        ? 'order(s) were changed by staff. Please review before issuing.'
        : 'order zimebadilishwa na staff. Tafadhali kagua kabla ya kutoa bidhaa.'}
      <div style={{fontWeight:'500',marginTop:'2px'}}>
        {pendingRequests.filter(hasUnackChanges).map((o:any)=>o.order_number).join(', ')}
      </div>
    </div>
  </div>
)}

    {pendingRequests.length === 0 ? (
      <div style={{textAlign:'center',padding:'50px',color:'#999'}}>
        <div style={{fontSize:'48px',marginBottom:'8px'}}>✅</div>
        <div>{lang==='en'?'No pending order requests':'Hakuna maombi ya orders yanayosubiri'}</div>
      </div>
    ) : (
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'800px'}}>
          <thead>
            <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Order #':'Namba'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Items':'Bidhaa'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
              <th style={{padding:'10px 8px'}}></th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((o:any) => {
              const totalItems = (o.order_items||[]).length;
              const remainingItems = (o.order_items||[]).filter((it:any)=>((it.quantity_requested||0)-(it.quantity_supplied||0))>0).length;
              return (
                <tr key={o.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  <td style={{padding:'10px 8px',fontWeight:'700',fontFamily:'monospace',color:'#0a1628'}}>
  {o.order_number}
  {hasUnackChanges(o) && (
    <span style={{marginLeft:'8px',background:'#f59e0b',color:'white',borderRadius:'10px',padding:'1px 8px',fontSize:'10px',fontWeight:'700',fontFamily:'Arial'}}>
      ⚠ {lang==='en'?'CHANGED':'IMEBADILISHWA'}
    </span>
  )}
</td>
                  <td style={{padding:'10px 8px',fontWeight:'600'}}>{o.customers?.name || '-'}</td>
                  <td style={{padding:'10px 8px'}}>{o.branches?.name || '-'}</td>
                  <td style={{padding:'10px 8px'}}>
                    <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                      {remainingItems}/{totalItems} {lang==='en'?'pending':'zinasubiri'}
                    </span>
                  </td>
                  <td style={{padding:'10px 8px'}}>
                    <span style={{fontSize:'12px',padding:'3px 10px',borderRadius:'12px',fontWeight:'600',
                      background:o.status==='processing'?'#fef9c3':'#dbeafe',
                      color:o.status==='processing'?'#854d0e':'#1d4ed8'}}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td style={{padding:'10px 8px'}}>
                    <button onClick={()=>{setViewingRequestOrder(o); setReqItemSearch('');}}
                      style={{padding:'6px 14px',background:'#0a1628',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
                      {lang==='en'?'View':'Ona'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}

    {/* VIEW MODAL - items za order husika, search + issue */}
    {viewingRequestOrder && (() => {
      const o = orders.find((ord:any)=>ord.id===viewingRequestOrder.id) || viewingRequestOrder;
      const items = (o.order_items||[]).filter((item:any)=>
        !reqItemSearch || item.item_name.toLowerCase().includes(reqItemSearch.toLowerCase())
      );
      return (
        <div style={{position:'fixed',top:0,left:'180px',right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
          <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1500px',margin:'20px auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
              <div>
              {hasUnackChanges(o) && (
  <div style={{background:'#fef3c7',border:'2px solid #f59e0b',borderRadius:'10px',padding:'14px',marginBottom:'16px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
      <strong style={{color:'#92400e',fontSize:'14px'}}>
        ⚠️ {lang==='en'?'This order was changed':'Order hii imebadilishwa'}
      </strong>
      <button onClick={()=>acknowledgeChanges(o.id)}
        style={{padding:'6px 14px',background:'#92400e',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'12px',fontWeight:'bold'}}>
        ✓ {lang==='en'?'Acknowledge':'Nimeona'}
      </button>
    </div>
    {(o.order_changes||[]).filter((c:any)=>!c.acknowledged).map((c:any)=>(
      <div key={c.id} style={{fontSize:'13px',color:'#78350f',padding:'3px 0'}}>
        {c.change_type==='added' && <>➕ <b>{c.item_name}</b>: {lang==='en'?'added':'imeongezwa'} ({c.new_value})</>}
        {c.change_type==='removed' && <>➖ <b>{c.item_name}</b>: {lang==='en'?'removed':'imeondolewa'} ({c.old_value})</>}
        {c.change_type==='qty_changed' && <>✏️ <b>{c.item_name}</b>: {lang==='en'?'qty':'idadi'} {c.old_value} → <b>{c.new_value}</b></>}
        {c.change_type==='price_changed' && <>💲 <b>{c.item_name}</b>: {lang==='en'?'price':'bei'} {c.old_value} → {c.new_value}</>}
        <span style={{color:'#a16207',marginLeft:'8px',fontSize:'11px'}}>
          — {c.changed_by_name || '-'}, {new Date(c.created_at).toLocaleTimeString()}
        </span>
      </div>
    ))}
  </div>
)}
                <h2 style={{margin:'0 0 4px',color:'#0a1628'}}>{o.order_number}</h2>
                <div style={{fontSize:'13px',color:'#374151',fontWeight:'600'}}>
                  {o.customers?.name} <span style={{color:'#999',fontWeight:'400'}}>• {o.branches?.name || '-'}</span>
                </div>
                {o.notes && <div style={{fontSize:'12px',color:'#854d0e',background:'#fef9c3',padding:'4px 8px',borderRadius:'6px',marginTop:'6px',display:'inline-block'}}>📝 {o.notes}</div>}
              </div>
              <button onClick={()=>{setViewingRequestOrder(null); setReqItemSearch('');}}
                style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
            </div>

            {/* Search + dropdown ya kuchagua item */}
<div style={{position:'relative',marginBottom:'16px'}}>
  <input
    value={reqItemSearch}
    onChange={e=>setReqItemSearch(e.target.value)}
    onFocus={()=>setReqItemSearch(prev=>prev)}
    placeholder={lang==='en'?'Search item in this order...':'Tafuta bidhaa ndani ya order hii...'}
    style={{width:'100%',padding:'10px 14px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
  />
  {reqItemSearch.trim() && (() => {
    const matches = (o.order_items||[]).filter((it:any)=>
      it.item_name.toLowerCase().includes(reqItemSearch.toLowerCase())
    );
    return (
      <div style={{position:'absolute',top:'100%',left:0,right:0,zIndex:50,background:'white',border:'2px solid #e5e7eb',borderRadius:'8px',marginTop:'4px',maxHeight:'220px',overflowY:'auto',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
        {matches.length === 0 ? (
          <div style={{padding:'12px',fontSize:'13px',color:'#999',textAlign:'center'}}>
            {lang==='en'?'No item found':'Hakuna bidhaa iliyopatikana'}
          </div>
        ) : matches.map((item:any)=>{
          const remaining = (item.quantity_requested||0) - (item.quantity_supplied||0);
          const done = remaining <= 0;
          return (
            <div key={item.id}
              onClick={()=>{
                setSelectedIssueItemId(item.id);
                setIssueQty((prev:any)=>({...prev, [item.id]: prev[item.id] || String(remaining)}));
                setReqItemSearch('');
              }}
              style={{padding:'10px 12px',cursor:'pointer',borderBottom:'1px solid #f0f0f0',fontSize:'13px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}
              onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
              onMouseLeave={e=>e.currentTarget.style.background='white'}>
              <span style={{fontWeight:'600'}}>{item.item_name}</span>
              <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'10px',
                background:done?'#dcfce7':'#fef9c3',color:done?'#15803d':'#854d0e'}}>
                {done?(lang==='en'?'Done':'Imekamilika'):`${remaining} ${lang==='en'?'left':'zimebaki'}`}
              </span>
            </div>
          );
        })}
      </div>
    );
  })()}
</div>

{/* ENTRY LINE - inaonekana ukishachagua item */}
{selectedIssueItemId !== null && (() => {
  const item = (o.order_items||[]).find((it:any)=>it.id===selectedIssueItemId);
  if (!item) return null;
  const remaining = (item.quantity_requested||0) - (item.quantity_supplied||0);
  const stockRow = item.product_id ? computeStockBalance(o.branch_id).find((p:any)=>p.id===item.product_id) : null;
  const onHand = stockRow ? stockRow.onHand : null;
  const done = remaining <= 0;

  return (
    <div style={{padding:'14px',background:'#f9fafb',borderRadius:'8px',border:'1px dashed #d1d5db',marginBottom:'16px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
        <div>
          <span style={{fontWeight:'700',fontSize:'14px',color:'#0a1628'}}>{item.item_name}</span>
          <span style={{marginLeft:'8px',fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'600',
            background:item.item_type==='stock'?'#dbeafe':'#fef9c3',
            color:item.item_type==='stock'?'#1d4ed8':'#854d0e'}}>
            {item.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
          </span>
        </div>
        <button onClick={()=>{setSelectedIssueItemId(null);}}
          style={{background:'none',border:'none',color:'#666',cursor:'pointer',fontSize:'13px'}}>
          {lang==='en'?'Close':'Funga'}
        </button>
      </div>

      <div style={{display:'flex',gap:'16px',flexWrap:'wrap',alignItems:'flex-end'}}>
        {!done && item.item_type==='stock' && item.product_id && onHand !== null && onHand < remaining && (
  <button onClick={()=>openTransferModal({productId:item.product_id, qty:remaining-onHand, toBranch:o.branch_id, orderId:o.id})}
    style={{padding:'9px 16px',background:'#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
    🔄 {lang==='en'?'Request from another branch':'Omba tawi lingine'}
  </button>
)}
        <div>
          <div style={{fontSize:'11px',color:'#666',fontWeight:'600',marginBottom:'2px'}}>{lang==='en'?'Ordered':'Iliyoombwa'}</div>
          <div style={{fontWeight:'700',fontSize:'14px'}}>{item.quantity_requested}</div>
        </div>
        <div>
          <div style={{fontSize:'11px',color:'#666',fontWeight:'600',marginBottom:'2px'}}>{lang==='en'?'Issued':'Iliyotolewa'}</div>
          <div style={{fontWeight:'700',fontSize:'14px',color:'#15803d'}}>{item.quantity_supplied||0}</div>
        </div>
        <div>
          <div style={{fontSize:'11px',color:'#666',fontWeight:'600',marginBottom:'2px'}}>{lang==='en'?'Remaining':'Iliyobaki'}</div>
          <div style={{fontWeight:'700',fontSize:'14px',color:done?'#15803d':'#dc2626'}}>{remaining}</div>
        </div>
        <div>
          <div style={{fontSize:'11px',color:'#666',fontWeight:'600',marginBottom:'2px'}}>{lang==='en'?'On Hand':'Stoo'}</div>
          <div style={{fontWeight:'700',fontSize:'14px'}}>{onHand===null ? 'N/A' : onHand}</div>
        </div>

        {!done && (
          <>
            <div>
              <div style={{fontSize:'11px',color:'#666',fontWeight:'600',marginBottom:'2px'}}>{lang==='en'?'Issue Qty':'Toa Idadi'}</div>
              <input type="number" min="0" max={remaining}
                value={issueQty[item.id]||''}
                onChange={e=>setIssueQty((prev:any)=>({...prev,[item.id]:e.target.value}))}
                placeholder={String(remaining)}
                style={{width:'90px',padding:'8px',border:'2px solid #e5e7eb',borderRadius:'6px',fontSize:'14px'}}
              />
            </div>
            <button onClick={()=>setIssueQty((prev:any)=>({...prev,[item.id]:String(onHand===null?remaining:Math.max(0,Math.min(remaining,onHand)))}))}
              style={{padding:'8px 12px',background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px'}}>
              {lang==='en'?'Max':'Zote'}
            </button>
            <button onClick={()=>issueOrderItem(o,item)} disabled={issuing}
              style={{padding:'9px 20px',background:issuing?'#9ca3af':'#15803d',color:'white',border:'none',borderRadius:'8px',cursor:issuing?'not-allowed':'pointer',fontSize:'13px',fontWeight:'bold'}}>
              {issuing ? '...' : `✓ ${lang==='en'?'Issue':'Toa'}`}
            </button>
          </>
        )}
        {done && (
          <span style={{color:'#15803d',fontWeight:'700',fontSize:'14px'}}>✓ {lang==='en'?'Fully issued':'Imekamilika'}</span>
        )}
      </div>
    </div>
  );
})()}

{/* LIST - items zote za order hii, bonyeza kubadilisha entry line */}
<div style={{marginTop:'4px'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
    <span style={{fontSize:'12px',fontWeight:'700',color:'#374151',textTransform:'uppercase',letterSpacing:'0.3px'}}>
      {lang==='en'?'Items in this order':'Bidhaa za order hii'}
    </span>
    <span style={{fontSize:'12px',color:'#666'}}>
      {(o.order_items||[]).length} {lang==='en'?'item(s)':'bidhaa'}
    </span>
  </div>

  <div style={{border:'1px solid #e5e7eb',borderRadius:'10px',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
    <table style={{width:'100%',borderCollapse:'collapse'}}>
      <thead>
        <tr style={{background:'#0a1628'}}>
          <th style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>#</th>
          <th style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Item':'Bidhaa'}</th>
          <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Ordered':'Iliyoombwa'}</th>
          <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Issued':'Iliyotolewa'}</th>
          <th style={{padding:'10px 12px',textAlign:'right',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Remaining':'Iliyobaki'}</th>
          <th style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',color:'#c9a84c',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.3px'}}>{lang==='en'?'Status':'Hali'}</th>
        </tr>
      </thead>
      <tbody>
        {(o.order_items||[]).map((item:any, idx:number) => {
          const remaining = (item.quantity_requested||0) - (item.quantity_supplied||0);
          const done = remaining <= 0;
          const isSelected = selectedIssueItemId === item.id;
          return (
            <tr key={item.id}
              onClick={()=>{
                if (done) return;
                setSelectedIssueItemId(item.id);
                setIssueQty((prev:any)=>({...prev, [item.id]: prev[item.id] || String(remaining)}));
              }}
              style={{
                background: isSelected ? '#fef9c3' : (done ? '#f0fdf4' : (idx % 2 === 0 ? 'white' : '#f9fafb')),
                borderBottom:'1px solid #f0f0f0',
                cursor: done ? 'default' : 'pointer'
              }}>
              <td style={{padding:'10px 12px',fontSize:'12px',color:'#999'}}>{idx + 1}</td>
              <td style={{padding:'10px 12px'}}>
                <div style={{fontWeight:'600',fontSize:'13px',color:'#0a1628'}}>{item.item_name}</div>
                {(item.quantity_supplied || 0) > 0 && (
  <div style={{fontSize:'11px',color:'#15803d',fontWeight:'600'}}>
    ✓ {lang==='en'?'Issued':'Imetolewa'}: {item.quantity_supplied}
  </div>
)}
                <span style={{
                  display:'inline-block',marginTop:'2px',fontSize:'10px',padding:'1px 7px',borderRadius:'8px',fontWeight:'600',
                  background:item.item_type==='stock'?'#dbeafe':'#fef9c3',
                  color:item.item_type==='stock'?'#1d4ed8':'#854d0e'
                }}>
                  {item.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
                </span>
              </td>
              <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',fontWeight:'600'}}>{item.quantity_requested}</td>
              <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',fontWeight:'700',color:'#15803d'}}>{item.quantity_supplied||0}</td>
              <td style={{padding:'10px 12px',textAlign:'right',fontSize:'13px',fontWeight:'700',color:done?'#15803d':'#dc2626'}}>{remaining}</td>
              <td style={{padding:'10px 12px'}}>
                {done ? (
                  <span style={{color:'#15803d',fontWeight:'700',fontSize:'13px'}}>✓ {lang==='en'?'Done':'Imekamilika'}</span>
                ) : (
                  <span style={{color:'#999',fontSize:'12px'}}>{lang==='en'?'Click to issue':'Bonyeza kutoa'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'20px'}}>
              <button onClick={()=>{setViewingRequestOrder(null); setReqItemSearch('');}}
                style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
                {lang==='en'?'Close':'Funga'}
              </button>
            </div>
          </div>
        </div>
      );
    })()}
  </div>
)}

      {/* STOCK IN / OUT / EXPIRED history */}
      {['in','out','expired'].includes(stockTab) && (
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'12px'}}>
            <h3 style={{margin:0,color:'#0a1628'}}>
              {stockTab==='in' && (lang==='en'?'Stock In History':'Historia ya Stoo Kuingia')}
              {stockTab==='out' && (lang==='en'?'Stock Out History':'Historia ya Stoo Kutoka')}
              {stockTab==='expired' && (lang==='en'?'Expired / Damaged Stock':'Stoo Iliyoisha Muda / Imeharibika')}
            </h3>
            {stockTab==='in' && (
              <button onClick={()=>{ if(effBranch) setStkBranch(String(effBranch)); setStockModalType('in'); }}
                style={{padding:'8px 16px',background:'#15803d',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                + {lang==='en'?'Record Stock In':'Rekodi'}
              </button>
            )}
            {stockTab==='out' && (
              <button onClick={()=>{ if(effBranch) setStkBranch(String(effBranch)); setStockModalType('out'); }}
                style={{padding:'8px 16px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                + {lang==='en'?'Record Stock Out':'Rekodi'}
              </button>
            )}
            {stockTab==='expired' && (
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={()=>{ if(effBranch) setStkBranch(String(effBranch)); setStockModalType('expired'); }}
                  style={{padding:'8px 16px',background:'#b45309',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                  + {lang==='en'?'Expired':'Imeisha Muda'}
                </button>
                <button onClick={()=>{ if(effBranch) setStkBranch(String(effBranch)); setStockModalType('damaged'); }}
                  style={{padding:'8px 16px',background:'#dc2626',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
                  + {lang==='en'?'Damaged':'Imeharibika'}
                </button>
              </div>
            )}
          </div>

          {loadingStock ? <p style={{color:'#666'}}>{lang==='en'?'Loading...':'Inapakia...'}</p> : (() => {
            const filtered = branchMovements.filter((m:any) =>
  stockTab === 'expired' ? ['expired','damaged'].includes(m.movement_type) : m.movement_type === stockTab
);
            return filtered.length === 0 ? (
              <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
                <div style={{fontSize:'48px',marginBottom:'8px'}}>📭</div>
                <div>{lang==='en'?'No records yet':'Hakuna rekodi bado'}</div>
              </div>
            ) : (
              <div style={{overflowX:'auto'}}>
  <table style={{width:'100%',borderCollapse:'collapse',minWidth:'800px'}}>
        <thead>
      <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Item Name':'Jina la Bidhaa'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Type':'Aina'}</th>
        <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Quantity':'Idadi'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Reference':'Marejeleo'}</th>
        <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
        {((stockTab === 'in' && canEditStock()) || (stockTab === 'out' && currentUser?.role_name === 'Store Keeper')) && (
  <th style={{padding:'10px 8px'}}></th>
)}
      </tr>
    </thead>
    <tbody>
      {filtered.map((m:any) => (
        <tr key={m.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
          <td style={{padding:'10px 8px',fontWeight:'600'}}>{m.products?.name || '-'}</td>
          <td style={{padding:'10px 8px'}}>
            <span style={{
              background: m.movement_type==='in'?'#dcfce7':m.movement_type==='out'?'#dbeafe':m.movement_type==='expired'?'#fef9c3':'#fee2e2',
              color: m.movement_type==='in'?'#15803d':m.movement_type==='out'?'#1d4ed8':m.movement_type==='expired'?'#854d0e':'#dc2626',
              padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'
            }}>{movementLabels[m.movement_type]}</span>
          </td>
          <td style={{padding:'10px 8px',textAlign:'right',fontWeight:'700'}}>{m.quantity}</td>
          <td style={{padding:'10px 8px'}}>{m.branches?.name || '-'}</td>
          <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>{m.reference || '-'}</td>
          <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
            {m.movement_date ? new Date(m.movement_date).toLocaleDateString() : '-'}
            {m.edit_count > 0 && (
              <div onClick={()=>openMovementHistory(m)}
                title={lang==='en'?'View edit history':'Ona historia ya mabadiliko'}
                style={{marginTop:'3px',fontSize:'10px',color:'#b45309',fontWeight:'700',cursor:'pointer',textDecoration:'underline'}}>
                ✎ {lang==='en'?'Edited':'Imehaririwa'} {m.edit_count}× — {m.edited_by_name}
              </div>
            )}
          </td>
          {((stockTab === 'in' && canEditStock()) || (stockTab === 'out' && currentUser?.role_name === 'Store Keeper')) && (
  <td style={{padding:'10px 8px',textAlign:'right',whiteSpace:'nowrap'}}>
    {(m.reference || '').startsWith('TRF-') ? (
      canEditTransfer(m) ? (
        <button onClick={()=>openEditMovement(m)}
          style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
          ✏️ {lang==='en'?'Edit transfer':'Hariri uhamisho'}
        </button>
      ) : (
        <span title={lang==='en'?'Transfer: only sender Store Keeper can edit':'Uhamisho: Store Keeper anayetuma pekee'}
          style={{fontSize:'12px',color:'#9ca3af'}}>🔒</span>
      )
    ) : stockTab === 'in' ? (
      <button onClick={()=>openEditMovement(m)}
        style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
        ✏️ {lang==='en'?'Edit':'Hariri'}
      </button>
    ) : null}
  </td>
)}
        </tr>
      ))}
    </tbody>
  </table>
</div>
                      );
          })()}
        </div>
      )}

      {/* TRANSFER ITEMS */}
      {stockTab === 'transfers' && (
  <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
      <h3 style={{margin:0,color:'#0a1628'}}>{lang==='en'?'Transfer Requests':'Maombi ya Uhamisho wa Stoo'}</h3>
      <button onClick={()=>openTransferModal()}
        style={{padding:'8px 16px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',fontSize:'13px'}}>
        + {lang==='en'?'New Request':'Omba Bidhaa'}
      </button>
    </div>

    {visibleTransfers.length === 0 ? (
      <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
        <div style={{fontSize:'48px',marginBottom:'8px'}}>🔄</div>
        <div>{lang==='en'?'No requests yet':'Hakuna maombi bado'}</div>
      </div>
    ) : (
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'800px'}}>
          <thead>
            <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Item':'Bidhaa'}</th>
              <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Qty':'Idadi'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'From':'Kutoka'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'To':'Kwenda'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Sent to':'Imetumwa kwa'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Requested by':'Aliyeomba'}</th>
              <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
              <th style={{padding:'10px 8px'}}></th>
            </tr>
          </thead>
          <tbody>
            {visibleTransfers.map((r:any)=>{
              const targetStaff = staff.find(s=>s.id===r.target_user_id);
              return (
                <tr key={r.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  <td style={{padding:'10px 8px',fontWeight:'600'}}>{r.products?.name}</td>
                  <td style={{padding:'10px 8px',textAlign:'right',fontWeight:'700'}}>{r.quantity}</td>
                  <td style={{padding:'10px 8px'}}>{r.src_branch?.name || '-'}</td>
                  <td style={{padding:'10px 8px'}}>{r.req_branch?.name || '-'}</td>
                  <td style={{padding:'10px 8px',fontSize:'13px'}}>
                    {r.target_type==='admin' ? (lang==='en'?'Admin / Director':'Admin / Director')
                      : r.target_type==='staff' ? (targetStaff?.full_name || 'Staff')
                      : (lang==='en'?'Store Keeper (branch)':'Store Keeper wa tawi')}
                  </td>
                  <td style={{padding:'10px 8px',fontSize:'13px',color:'#666'}}>{r.requested_by_name || '-'}</td>
                  <td style={{padding:'10px 8px'}}>
                    <span style={{fontSize:'12px',padding:'3px 10px',borderRadius:'12px',fontWeight:'600',
                      background:r.status==='approved'?'#dcfce7':r.status==='rejected'?'#fee2e2':'#fef9c3',
                      color:r.status==='approved'?'#15803d':r.status==='rejected'?'#dc2626':'#854d0e'}}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{padding:'10px 8px',whiteSpace:'nowrap'}}>
                    {r.status==='pending' && canRespondRequest(r) && (
                      <>
                        <button onClick={()=>respondStockRequest(r,true)}
                          style={{background:'none',border:'none',color:'#15803d',cursor:'pointer',fontSize:'13px',fontWeight:'700',marginRight:'8px'}}>
                          ✓ {lang==='en'?'Approve':'Kubali'}
                        </button>
                        <button onClick={()=>respondStockRequest(r,false)}
                          style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'13px'}}>
                          {lang==='en'?'Reject':'Kataa'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

      {/* REGISTERED ITEMS */}
      {stockTab === 'registered' && (
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px',flexWrap:'wrap',gap:'12px'}}>
            <h3 style={{margin:0,color:'#0a1628'}}>
              {lang==='en'?'Registered Items':'Bidhaa Zilizosajiliwa'}
<span style={{marginLeft:'8px',fontSize:'14px',color:'#666',fontWeight:'normal'}}>({registeredList.length})</span>
            </h3>
            <input placeholder={lang==='en'?'Search item...':'Tafuta bidhaa...'}
              value={stockSearch} onChange={e=>setStockSearch(e.target.value)}
              style={{padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
            />
          </div>

          <div style={{fontSize:'12px',color:'#666',marginBottom:'12px'}}>
            {lang==='en'?'Click an item to edit or delete it':'Bonyeza bidhaa kuhariri au kufuta'}
          </div>

          {registeredList.length === 0 ? (
            <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
              <div style={{fontSize:'48px',marginBottom:'8px'}}>🗂️</div>
              <div>{lang==='en'?'No registered items yet':'Hakuna bidhaa zilizosajiliwa bado'}</div>
            </div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
                <thead>
                  <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                    <th style={{padding:'10px 8px'}}>#</th>
                    <th style={{padding:'10px 8px'}}>{lang==='en'?'Item Name':'Jina la Bidhaa'}</th>
                    <th style={{padding:'10px 8px'}}>{lang==='en'?'Category':'Kundi'}</th>
                    <th style={{padding:'10px 8px'}}>{lang==='en'?'Type':'Aina'}</th>
                    <th style={{padding:'10px 8px'}}>{lang==='en'?'Unit':'Kipimo'}</th>
                    <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Ref. Price':'Bei ya Rejea'}</th>
                    <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'On Hand':'Iliyopo'}</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredList.map((p:any, idx:number) => (
                    <tr key={p.id}
                      onClick={()=>openProductMenu(p)}
                      style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px',cursor:'pointer'}}
                      onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                      onMouseLeave={e=>e.currentTarget.style.background='white'}>
                      <td style={{padding:'10px 8px',color:'#999',fontSize:'12px'}}>{idx+1}</td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{p.name}</td>
                      <td style={{padding:'10px 8px'}}>{p.category || '-'}</td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{
                          fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'600',
                          background:p.item_type==='stock'?'#dbeafe':'#fef9c3',
                          color:p.item_type==='stock'?'#1d4ed8':'#854d0e'
                        }}>
                          {p.item_type==='stock'?(lang==='en'?'Stock':'Stoo'):(lang==='en'?'Special':'Maalum')}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px'}}>{p.unit || '-'}</td>
                      <td style={{padding:'10px 8px',textAlign:'right'}}>TSh {(p.unit_price||0).toLocaleString()}</td>
                      <td style={{padding:'10px 8px',textAlign:'right',fontWeight:'700',
                        color:p.onHand<=0?'#dc2626':p.onHand<10?'#b45309':'#15803d'}}>
                        {p.onHand}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* PRODUCT EDIT / DELETE MODAL (nje ya block ya registered) */}
      {selectedProduct && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}
          onClick={closeProductModal}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth: productModalMode==='edit' ? '560px' : '420px'}}>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{margin:0,color:'#0a1628',fontSize:'18px'}}>
                {productModalMode==='edit' ? `✏️ ${lang==='en'?'Edit Item':'Hariri Bidhaa'}` : selectedProduct.name}
              </h2>
              <button onClick={closeProductModal} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
            </div>

            {productModalMode === 'menu' ? (
              <>
                <div style={{background:'#f9fafb',borderRadius:'8px',padding:'12px',marginBottom:'16px',fontSize:'13px',color:'#374151'}}>
                  <div>{lang==='en'?'Category':'Kundi'}: <strong>{selectedProduct.category || '-'}</strong></div>
                  <div>{lang==='en'?'Unit':'Kipimo'}: <strong>{selectedProduct.unit || '-'}</strong></div>
                  <div>{lang==='en'?'On Hand':'Iliyopo'}: <strong>{selectedProduct.onHand}</strong></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                  <button onClick={()=>setProductModalMode('edit')}
                    style={{padding:'14px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold',fontSize:'14px'}}>
                    ✏️ {lang==='en'?'Edit':'Hariri'}
                  </button>
                  <button onClick={deleteProduct}
                    style={{padding:'14px',background:'#fee2e2',color:'#dc2626',border:'2px solid #fca5a5',borderRadius:'8px',cursor:'pointer',fontWeight:'bold',fontSize:'14px'}}>
                    🗑️ {lang==='en'?'Delete':'Futa'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{marginBottom:'14px'}}>
                  <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Item Name *':'Jina la Bidhaa *'}</label>
                  <input value={editProdName} onChange={e=>setEditProdName(e.target.value)} autoFocus
                    style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
                  <div>
                    <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Category':'Kundi'}</label>
                    <input value={editProdCategory} onChange={e=>setEditProdCategory(e.target.value)}
                      style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
                  </div>
                  <div>
                    <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Unit':'Kipimo'}</label>
                    <input value={editProdUnit} onChange={e=>setEditProdUnit(e.target.value)}
                      style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
                  <div>
                    <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Type':'Aina'}</label>
                    <select value={editProdType} onChange={e=>setEditProdType(e.target.value)}
                      style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
                      <option value="stock">{lang==='en'?'Stock':'Stoo'}</option>
                      <option value="special">{lang==='en'?'Special':'Maalum'}</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>{lang==='en'?'Reference Price (TSh)':'Bei ya Rejea (TSh)'}</label>
                    <input type="number" min="0" value={editProdPrice} onChange={e=>setEditProdPrice(e.target.value)}
                      style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} />
                  </div>
                </div>
                <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
                  <button onClick={()=>setProductModalMode('menu')}
                    style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
                    {lang==='en'?'Back':'Rudi'}
                  </button>
                  <button onClick={updateProduct} disabled={savingProduct}
                    style={{padding:'12px 24px',background:savingProduct?'#9ca3af':'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:savingProduct?'not-allowed':'pointer',fontWeight:'bold'}}>
                    ✓ {savingProduct ? '...' : (lang==='en'?'Save':'Hifadhi')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
})()}

{page === 'invoices' && (
  <div>
    {/* Create Invoice Modal */}
    {creatingInvoiceFor && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px'}}>
          <h2 style={{margin:'0 0 20px',color:'#0a1628'}}>🧾 {lang==='en'?'Create Invoice':'Tengeneza Invoice'}</h2>
          <p style={{color:'#666',fontSize:'14px',marginBottom:'16px'}}>
            {lang==='en'?'Order':'Order'}: <strong>{creatingInvoiceFor.order_number}</strong> — {creatingInvoiceFor.customers?.name}
          </p>

          <div style={{border:'1px solid #e5e7eb',borderRadius:'8px',marginBottom:'16px',overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
              <thead>
                <tr style={{background:'#f9fafb',color:'#666'}}>
                  <th style={{padding:'8px',textAlign:'left'}}>{lang==='en'?'Item':'Bidhaa'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Qty':'Idadi'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Price':'Bei'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Disc':'Pun'}</th>
                  <th style={{padding:'8px',textAlign:'right'}}>{lang==='en'?'Total':'Jumla'}</th>
                </tr>
              </thead>
              <tbody>
                {(creatingInvoiceFor.order_items||[]).map((item: any) => (
                  <tr key={item.id} style={{borderTop:'1px solid #f0f0f0'}}>
                    <td style={{padding:'8px'}}>{item.item_name}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>{item.quantity_requested}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>TSh {(item.unit_price||0).toLocaleString()}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>{item.discount||0}%</td>
                    <td style={{padding:'8px',textAlign:'right',fontWeight:'600'}}>
                      TSh {((item.quantity_requested * item.unit_price) * (1-(item.discount/100))).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{background:'#f9fafb',fontWeight:'bold'}}>
                  <td colSpan={4} style={{padding:'10px 8px',textAlign:'right'}}>Subtotal:</td>
                  <td style={{padding:'10px 8px',textAlign:'right'}}>
                    TSh {(creatingInvoiceFor.order_items||[]).reduce((sum: number, item: any) => 
                      sum + ((item.quantity_requested * item.unit_price) * (1-(item.discount/100))), 0
                    ).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
            <div style={{flex:1}}>
              <label style={{display:'block',marginBottom:'6px',fontSize:'13px',fontWeight:'600',color:'#374151'}}>
                {lang==='en'?'Tax (%)':'Kodi (%)'} — VAT/TRA
              </label>
              <input type="number" min="0" max="100" value={invoiceTax}
                onChange={e=>setInvoiceTax(e.target.value)}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
            <div style={{flex:2}}>
              <label style={{display:'block',marginBottom:'6px',fontSize:'13px',fontWeight:'600',color:'#374151'}}>
                {lang==='en'?'Notes':'Maelezo'}
              </label>
              <input value={invoiceNotes} onChange={e=>setInvoiceNotes(e.target.value)}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
          </div>

          <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px',marginBottom:'20px',fontSize:'14px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
              <span style={{color:'#666'}}>{lang==='en'?'Subtotal':'Jumla ndogo'}:</span>
              <span>TSh {(creatingInvoiceFor.total_amount||0).toLocaleString()}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
              <span style={{color:'#666'}}>Tax ({invoiceTax}%):</span>
              <span>TSh {((creatingInvoiceFor.total_amount||0) * (parseFloat(invoiceTax)||0) / 100).toLocaleString()}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontWeight:'700',fontSize:'16px',paddingTop:'8px',borderTop:'1px solid #e5e7eb'}}>
              <span>TOTAL:</span>
              <span style={{color:'#0a1628'}}>
                TSh {((creatingInvoiceFor.total_amount||0) * (1 + (parseFloat(invoiceTax)||0)/100)).toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
            <button onClick={()=>setCreatingInvoiceFor(null)}
              style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Cancel':'Ghairi'}
            </button>
            <button onClick={()=>createInvoice(creatingInvoiceFor)}
              style={{padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Create Invoice':'Tengeneza Invoice'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Create Invoice from Order */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Create Invoice from Order':'Tengeneza Invoice kutoka Order'}</h3>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
          <thead>
            <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
              <th style={{padding:'8px'}}>{lang==='en'?'Order #':'Namba'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Total':'Jumla'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Status':'Hali'}</th>
              <th style={{padding:'8px'}}></th>
            </tr>
          </thead>
          <tbody>
            {(() => {
  const list = orders.filter(o =>
    (!orderSearch || o.order_number?.includes(orderSearch) || o.customers?.name?.toLowerCase().includes(orderSearch.toLowerCase())) &&
    (!orderStatusFilter || o.status === orderStatusFilter)
  );

  // Kundi kwa mteja (orders ni za karibuni kwanza, kwa hiyo mpangilio unabaki)
  const groups: Record<string, any[]> = {};
  const keys: string[] = [];
  list.forEach(o => {
    const k = String(o.customer_id);
    if (!groups[k]) { groups[k] = []; keys.push(k); }
    groups[k].push(o);
  });

  return keys.map(k => {
    const g = groups[k];
    if (g.length === 1) return renderOrderRow(g[0]);

    const cid = g[0].customer_id;
    const open = !!expandedCustOrders[k] || !!orderSearch;
    const totalAmt = g.reduce((s, o) => s + (o.total_amount || 0), 0);
    const pendingCnt = g.filter(o => ['received','processing','pending'].includes(o.status)).length;
    const totalItems = g.reduce((s, o) => s + (o.order_items?.length || 0), 0);
    const lastDate = g[0].created_at;

    const invoiced = invoices.filter(i => i.customer_id === cid).reduce((s, i) => s + (i.total_amount || 0), 0);
    const paid = payments.filter(p => p.customer_id === cid && p.status === 'confirmed').reduce((s, p) => s + (p.amount || 0), 0);
    const balance = invoiced - paid;

    return (
      <React.Fragment key={'cust-' + k}>
        <tr onClick={() => setExpandedCustOrders(prev => ({ ...prev, [k]: !prev[k] }))}
          style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px',cursor:'pointer',background: open ? '#eff6ff' : 'white'}}>
          <td style={{padding:'10px 8px'}}>
            <span style={{fontWeight:'700',color:'#1d4ed8'}}>{open ? '▾' : '▸'} {g.length} orders</span>
          </td>
          <td style={{padding:'10px 8px'}}>
            <div style={{fontWeight:'700'}}>{g[0].customers?.name}</div>
            <div style={{fontSize:'12px',color:'#666'}}>{g[0].customers?.type}</div>
          </td>
          <td style={{padding:'10px 8px'}}>
            {new Set(g.map(o => o.branch_id)).size > 1 ? (lang==='en'?'Multiple':'Matawi mengi') : (g[0].branches?.name || '-')}
          </td>
          <td style={{padding:'10px 8px'}}>
            <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
              {totalItems} {lang==='en'?'items':'bidhaa'}
            </span>
          </td>
          <td style={{padding:'10px 8px'}}>
            <div style={{fontWeight:'700'}}>TSh {totalAmt.toLocaleString()}</div>
            <div style={{fontSize:'11px',color:'#15803d'}}>{lang==='en'?'Paid':'Kilicholipwa'}: TSh {paid.toLocaleString()}</div>
            <div style={{fontSize:'11px',fontWeight:'700',color: balance > 0 ? '#dc2626' : '#15803d'}}>
              {lang==='en'?'Balance':'Deni'}: TSh {balance.toLocaleString()}
            </div>
          </td>
          <td style={{padding:'10px 8px'}}>
            {pendingCnt > 0 ? (
              <span style={{background:'#fee2e2',color:'#dc2626',padding:'3px 10px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                {pendingCnt} {lang==='en'?'pending':'zinasubiri'}
              </span>
            ) : (
              <span style={{background:'#dcfce7',color:'#15803d',padding:'3px 10px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                {lang==='en'?'All done':'Zote zimekamilika'}
              </span>
            )}
          </td>
          <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>{new Date(lastDate).toLocaleDateString()}</td>
          <td style={{padding:'10px 8px'}}></td>
        </tr>
        {open && g.map(o => renderOrderRow(o, true))}
      </React.Fragment>
    );
  });
})()}
          </tbody>
        </table>
      </div>
    </div>

    {/* Search */}
    <div style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'16px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
      <input placeholder={lang==='en'?'Search invoice...':'Tafuta invoice...'}
        value={invoiceSearch} onChange={e=>setInvoiceSearch(e.target.value)}
        style={{flex:'1 1 200px',padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
      />
      <select value={invoiceStatusFilter} onChange={e=>setInvoiceStatusFilter(e.target.value)}
        style={{padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
        <option value="">{lang==='en'?'All statuses':'Hali zote'}</option>
        <option value="unpaid">{lang==='en'?'Unpaid':'Haijalipiwa'}</option>
        <option value="partial">{lang==='en'?'Partial':'Nusu'}</option>
        <option value="paid">{lang==='en'?'Paid':'Imelipwa'}</option>
      </select>
    </div>

    {/* Invoices List */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Invoices':'Invoices Zote'}</h3>
      {loadingInvoices ? <p>{lang==='en'?'Loading...':'Inapakia...'}</p> :
      invoices.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🧾</div>
          <div>{lang==='en'?'No invoices yet':'Hakuna invoices bado'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Document Nos':'Namba za Nyaraka'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Total':'Jumla'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Due Date':'Tarehe ya Malipo'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
                <th style={{padding:'10px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              {invoices
                .filter(inv=>
                  (!invoiceSearch || inv.invoice_number?.includes(invoiceSearch) || inv.customers?.name?.toLowerCase().includes(invoiceSearch.toLowerCase())) &&
                  (!invoiceStatusFilter || inv.status === invoiceStatusFilter)
                )
                .map(inv => {
                  const statusColors: any = {
                    unpaid: {bg:'#fee2e2',color:'#dc2626'},
                    partial: {bg:'#fef9c3',color:'#854d0e'},
                    paid: {bg:'#dcfce7',color:'#15803d'},
                  };
                  const sc = statusColors[inv.status] || {bg:'#f3f4f6',color:'#666'};
                  return (
                    <tr key={inv.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                      <td style={{padding:'6px 8px'}}>
  {docNos(inv.orders?.order_number || '', inv.invoice_number || '', deliveryNosForOrder(inv.order_id))}
</td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{inv.customers?.name}</td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>TSh {(inv.total_amount||0).toLocaleString()}</td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                        {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '-'}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <select value={inv.status} onChange={e=>updateInvoiceStatus(inv.id,e.target.value)}
                          style={{background:sc.bg,color:sc.color,border:'none',borderRadius:'12px',padding:'4px 8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                          <option value="unpaid">{lang==='en'?'Unpaid':'Haijalipiwa'}</option>
                          <option value="partial">{lang==='en'?'Partial':'Nusu'}</option>
                          <option value="paid">{lang==='en'?'Paid':'Imelipwa'}</option>
                        </select>
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <button onClick={()=>{ console.log('VIEW INVOICE', inv); setViewingInvoice(inv); }}
  style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px'}}>
  {lang==='en'?'View':'Ona'}
</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* View Invoice Modal */}
    {viewingInvoice && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px',margin:'20px auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'}}>
            <div>
              <h2 style={{margin:'0 0 4px',color:'#0a1628'}}>🧾 {viewingInvoice.invoice_number}</h2>
              <p style={{margin:0,color:'#666',fontSize:'13px'}}>{new Date(viewingInvoice.created_at).toLocaleString()}</p>
            </div>
            <button onClick={()=>setViewingInvoice(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'20px'}}>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{fontSize:'11px',color:'#666',marginBottom:'4px',textTransform:'uppercase'}}>{lang==='en'?'Customer':'Mteja'}</div>
              <div style={{fontWeight:'700'}}>{viewingInvoice.customers?.name}</div>
              <div style={{fontSize:'12px',color:'#666'}}>{viewingInvoice.customers?.phone}</div>
            </div>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
  <div style={{fontSize:'11px',color:'#666',marginBottom:'6px',textTransform:'uppercase'}}>{lang==='en'?'Document Nos':'Namba za Nyaraka'}</div>
  {docNos(viewingInvoice.orders?.order_number || '', viewingInvoice.invoice_number || '', deliveryNosForOrder(viewingInvoice.order_id))}
  <div style={{fontSize:'12px',color:'#666',marginTop:'4px'}}>{lang==='en'?'Due':'Malipo'}: {viewingInvoice.due_date ? new Date(viewingInvoice.due_date).toLocaleDateString() : '-'}</div>
</div>
              
            </div>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{fontSize:'11px',color:'#666',marginBottom:'4px',textTransform:'uppercase'}}>Status</div>
              <div style={{fontWeight:'700',color: viewingInvoice.status==='paid'?'#15803d':viewingInvoice.status==='partial'?'#854d0e':'#dc2626'}}>
                {viewingInvoice.status==='paid'?(lang==='en'?'PAID':'IMELIPWA'):viewingInvoice.status==='partial'?(lang==='en'?'PARTIAL':'NUSU'):(lang==='en'?'UNPAID':'HAIJALIPIWA')}
              </div>
            </div>
          </div>

          <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'16px'}}>
            <thead>
              <tr style={{background:'#0a1628',color:'white',fontSize:'12px'}}>
                <th style={{padding:'10px 8px',textAlign:'left'}}>#</th>
                <th style={{padding:'10px 8px',textAlign:'left'}}>{lang==='en'?'Item':'Bidhaa'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Qty':'Idadi'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Price':'Bei'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Disc':'Pun'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Total':'Jumla'}</th>
              </tr>
            </thead>
            <tbody>
              {(viewingInvoice.invoice_items||[]).map((item: any, idx: number) => (
                <tr key={item.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  <td style={{padding:'8px',color:'#666'}}>{idx+1}</td>
                  <td style={{padding:'8px',fontWeight:'600'}}>{item.item_name}</td>
                  <td style={{padding:'8px',textAlign:'right'}}>{item.quantity}</td>
                  <td style={{padding:'8px',textAlign:'right'}}>TSh {(item.unit_price||0).toLocaleString()}</td>
                  <td style={{padding:'8px',textAlign:'right'}}>{item.discount||0}%</td>
                  <td style={{padding:'8px',textAlign:'right',fontWeight:'700'}}>TSh {(item.total_price||0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{borderTop:'1px solid #e5e7eb'}}>
                <td colSpan={5} style={{padding:'8px',textAlign:'right',color:'#666',fontSize:'13px'}}>Subtotal:</td>
                <td style={{padding:'8px',textAlign:'right',fontWeight:'600'}}>TSh {(viewingInvoice.subtotal||0).toLocaleString()}</td>
              </tr>
              {(viewingInvoice.tax||0) > 0 && (
                <tr>
                  <td colSpan={5} style={{padding:'8px',textAlign:'right',color:'#666',fontSize:'13px'}}>Tax:</td>
                  <td style={{padding:'8px',textAlign:'right',fontWeight:'600'}}>TSh {(viewingInvoice.tax||0).toLocaleString()}</td>
                </tr>
              )}
              <tr style={{background:'#0a1628'}}>
                <td colSpan={5} style={{padding:'12px 8px',textAlign:'right',color:'#c9a84c',fontWeight:'700'}}>TOTAL:</td>
                <td style={{padding:'12px 8px',textAlign:'right',color:'white',fontWeight:'700',fontSize:'16px'}}>TSh {(viewingInvoice.total_amount||0).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <div style={{display:'flex',justifyContent:'flex-end',gap:'12px'}}>
            <button onClick={()=>printInvoice(viewingInvoice)}
              style={{padding:'10px 20px',background:'#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              🖨️ {lang==='en'?'Print':'Chapisha'}
            </button>
            <button onClick={()=>setViewingInvoice(null)}
              style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Close':'Funga'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{page === 'deliveries' && (
  <div>
    {/* Create Delivery Modal */}
    {creatingDeliveryFor && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px',margin:'20px auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h2 style={{margin:0,color:'#0a1628'}}>🚚 {lang==='en'?'Create Delivery Note':'Tengeneza Delivery Note'}</h2>
            <button onClick={()=>setCreatingDeliveryFor(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          <p style={{color:'#666',fontSize:'14px',marginBottom:'16px'}}>
            {lang==='en'?'Order':'Order'}: <strong>{creatingDeliveryFor.order_number}</strong> — {creatingDeliveryFor.customers?.name}
          </p>

          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontSize:'13px',fontWeight:'600',color:'#374151'}}>
              {lang==='en'?'Received by (Customer side)':'Aliyepokea (Upande wa mteja)'}
            </label>
            <input value={receivedByCustomer} onChange={e=>setReceivedByCustomer(e.target.value)}
              placeholder={lang==='en'?'Name of person receiving...':'Jina la mpokeaji...'}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>

          <h4 style={{margin:'0 0 12px',color:'#0a1628'}}>{lang==='en'?'Items to Deliver':'Bidhaa za Kutuma'}</h4>
          <div style={{border:'1px solid #e5e7eb',borderRadius:'8px',overflow:'hidden',marginBottom:'16px'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f9fafb',fontSize:'12px',color:'#666'}}>
                  <th style={{padding:'10px 8px',textAlign:'left'}}>{lang==='en'?'Item':'Bidhaa'}</th>
                  <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Ordered':'Iliombwa'}</th>
                  <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Qty to Deliver':'Kutuma'}</th>
                  <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Pending':'Iliyobaki'}</th>
                  <th style={{padding:'10px 8px',textAlign:'left'}}>{lang==='en'?'Note':'Maelezo'}</th>
                </tr>
              </thead>
              <tbody>
                {deliveryItems.map((item: any) => (
                  <tr key={item.id} style={{borderTop:'1px solid #f0f0f0',fontSize:'14px'}}>
                    <td style={{padding:'8px',fontWeight:'600'}}>{item.item_name}
                      <span style={{marginLeft:'6px',fontSize:'11px',padding:'2px 6px',borderRadius:'8px',
                        background:item.item_type==='stock'?'#dbeafe':'#fef9c3',
                        color:item.item_type==='stock'?'#1d4ed8':'#854d0e'}}>
                        {item.item_type}
                      </span>
                    </td>
                    <td style={{padding:'8px',textAlign:'right',color:'#666'}}>{item.quantity_requested}</td>
                    <td style={{padding:'8px',textAlign:'right'}}>
                      <input type="number" min="0" max={item.quantity_requested}
                        value={item.qty_to_deliver||0}
                        onChange={e=>{
                          const val = Math.min(parseInt(e.target.value)||0, item.quantity_requested);
                          setDeliveryItems(prev=>prev.map(i=>i.id===item.id?{...i,qty_to_deliver:val}:i));
                        }}
                        style={{padding:'6px',border:'2px solid #e5e7eb',borderRadius:'6px',width:'80px',fontSize:'13px',textAlign:'right'}}
                      />
                    </td>
                    <td style={{padding:'8px',textAlign:'right',color: (item.quantity_requested - (item.qty_to_deliver||0))>0?'#dc2626':'#15803d',fontWeight:'600'}}>
                      {item.quantity_requested - (item.qty_to_deliver||0)}
                    </td>
                    <td style={{padding:'8px'}}>
                      <input placeholder={lang==='en'?'Note...':'Maelezo...'}
                        value={item.delivery_note||''}
                        onChange={e=>setDeliveryItems(prev=>prev.map(i=>i.id===item.id?{...i,delivery_note:e.target.value}:i))}
                        style={{padding:'6px',border:'1px solid #e5e7eb',borderRadius:'6px',fontSize:'13px',width:'100%'}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontSize:'13px',fontWeight:'600',color:'#374151'}}>
              {lang==='en'?'Delivery Notes':'Maelezo ya Delivery'}
            </label>
            <textarea value={deliveryNotes} onChange={e=>setDeliveryNotes(e.target.value)}
              rows={2}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box',resize:'vertical'}}
            />
          </div>

          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
            <button onClick={()=>{
              setDeliveryItems(prev=>prev.map(i=>({...i,qty_to_deliver:i.quantity_requested})));
            }} style={{padding:'10px 16px',background:'#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold',fontSize:'13px'}}>
              ✓ {lang==='en'?'All Items':'Bidhaa Zote'}
            </button>
            <button onClick={()=>setCreatingDeliveryFor(null)}
              style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Cancel':'Ghairi'}
            </button>
            <button onClick={()=>createDelivery(creatingDeliveryFor)}
              style={{padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              🚚 {lang==='en'?'Create Delivery Note':'Tengeneza Delivery'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Create Delivery from Order */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Create Delivery from Order':'Tengeneza Delivery kutoka Order'}</h3>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
          <thead>
            <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
              <th style={{padding:'8px'}}>{lang==='en'?'Order #':'Namba'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Items':'Bidhaa'}</th>
              <th style={{padding:'8px'}}>{lang==='en'?'Status':'Hali'}</th>
              <th style={{padding:'8px'}}></th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(o=>['received','processing','ready','dispatched'].includes(o.status)).slice(0,10).map(o=>{
              const hasDelivery = deliveries.some(d=>d.order_id===o.id);
              return (
                <tr key={o.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  <td style={{padding:'8px',fontFamily:'monospace',fontWeight:'700',color:'#0a1628'}}>{o.order_number}</td>
                  <td style={{padding:'8px'}}>{o.customers?.name}</td>
                  <td style={{padding:'8px'}}>{o.order_items?.length||0} {lang==='en'?'items':'bidhaa'}</td>
                  <td style={{padding:'8px'}}>
                    <span style={{fontSize:'12px',padding:'2px 8px',borderRadius:'12px',
                      background:hasDelivery?'#dcfce7':'#fef9c3',
                      color:hasDelivery?'#15803d':'#854d0e',fontWeight:'600'}}>
                      {hasDelivery?(lang==='en'?'Delivered':'Imetumwa'):(lang==='en'?'Pending':'Inasubiri')}
                    </span>
                  </td>
                  <td style={{padding:'8px',textAlign:'right'}}>
                    <button onClick={()=>{
                      setCreatingDeliveryFor(o);
                      setDeliveryItems((o.order_items||[]).map((item: any)=>({...item,qty_to_deliver:item.quantity_requested,delivery_note:''})));
                    }}
                      style={{padding:'6px 14px',background:'#0a1628',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
                      + {lang==='en'?'Create Delivery':'Tengeneza'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* Deliveries List */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Delivery Notes':'Delivery Notes Zote'}</h3>
      {loadingDeliveries ? <p>{lang==='en'?'Loading...':'Inapakia...'}</p> :
      deliveries.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🚚</div>
          <div>{lang==='en'?'No deliveries yet':'Hakuna deliveries bado'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Document Nos':'Namba za Nyaraka'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Items':'Bidhaa'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
                <th style={{padding:'10px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              {deliveries
                .filter(d=>!deliverySearch || d.delivery_number?.includes(deliverySearch) || d.customers?.name?.toLowerCase().includes(deliverySearch.toLowerCase()))
                .map(d=>{
                  const statusColors: any = {
                    pending:{bg:'#fef9c3',color:'#854d0e'},
                    dispatched:{bg:'#e0e7ff',color:'#3730a3'},
                    delivered:{bg:'#dcfce7',color:'#15803d'},
                    partial:{bg:'#fee2e2',color:'#dc2626'},
                    returned:{bg:'#f3f4f6',color:'#6b7280'},
                  };
                  const sc = statusColors[d.status]||{bg:'#f3f4f6',color:'#666'};
                  return (
                    <tr key={d.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                      <td style={{padding:'6px 8px'}}>
  {docNos(d.orders?.order_number || '', invoiceNoForOrder(d.order_id), d.delivery_number || '')}
</td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{d.customers?.name}</td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {d.delivery_items?.length||0} {lang==='en'?'items':'bidhaa'}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                        {d.delivery_date ? new Date(d.delivery_date).toLocaleDateString() : '-'}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <select value={d.status} onChange={e=>updateDeliveryStatus(d.id,e.target.value)}
                          style={{background:sc.bg,color:sc.color,border:'none',borderRadius:'12px',padding:'4px 8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                          <option value="pending">{lang==='en'?'Pending':'Inasubiri'}</option>
                          <option value="dispatched">{lang==='en'?'Dispatched':'Imetumwa'}</option>
                          <option value="delivered">{lang==='en'?'Delivered':'Imepokelewa'}</option>
                          <option value="partial">{lang==='en'?'Partial':'Nusu'}</option>
                          <option value="returned">{lang==='en'?'Returned':'Imerudishwa'}</option>
                        </select>
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <button onClick={()=>setViewingDelivery(d)}
                          style={{background:'none',border:'none',color:'#1d4ed8',cursor:'pointer',fontSize:'13px'}}>
                          {lang==='en'?'View':'Ona'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* View Delivery Modal */}
    {viewingDelivery && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px',margin:'20px auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h2 style={{margin:'0 0 4px',color:'#0a1628'}}>🚚 {viewingDelivery.delivery_number}</h2>
              <p style={{margin:0,color:'#666',fontSize:'13px'}}>{new Date(viewingDelivery.created_at).toLocaleString()}</p>
            </div>
            <button onClick={()=>setViewingDelivery(null)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'20px'}}>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{fontSize:'11px',color:'#666',marginBottom:'4px',textTransform:'uppercase'}}>{lang==='en'?'Customer':'Mteja'}</div>
              <div style={{fontWeight:'700'}}>{viewingDelivery.customers?.name}</div>
              <div style={{fontSize:'12px',color:'#666'}}>{viewingDelivery.customers?.phone}</div>
            </div>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
  <div style={{fontSize:'11px',color:'#666',marginBottom:'6px',textTransform:'uppercase'}}>{lang==='en'?'Document Nos':'Namba za Nyaraka'}</div>
  {docNos(viewingDelivery.orders?.order_number || '', invoiceNoForOrder(viewingDelivery.order_id), viewingDelivery.delivery_number || '')}
  <div style={{fontSize:'12px',color:'#666',marginTop:'4px'}}>{lang==='en'?'Date':'Tarehe'}: {viewingDelivery.delivery_date ? new Date(viewingDelivery.delivery_date).toLocaleDateString() : '-'}</div>
</div>
            </div>
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px'}}>
              <div style={{fontSize:'11px',color:'#666',marginBottom:'4px',textTransform:'uppercase'}}>{lang==='en'?'Received By':'Aliyepokea'}</div>
              <div style={{fontWeight:'700'}}>{viewingDelivery.received_by_customer || '-'}</div>
            </div>
          </div>

          <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'16px'}}>
            <thead>
              <tr style={{background:'#0a1628',color:'white',fontSize:'12px'}}>
                <th style={{padding:'10px 8px',textAlign:'left'}}>#</th>
                <th style={{padding:'10px 8px',textAlign:'left'}}>{lang==='en'?'Item':'Bidhaa'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Ordered':'Iliombwa'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Delivered':'Ilitumwa'}</th>
                <th style={{padding:'10px 8px',textAlign:'right'}}>{lang==='en'?'Pending':'Iliyobaki'}</th>
                <th style={{padding:'10px 8px',textAlign:'left'}}>{lang==='en'?'Status':'Hali'}</th>
              </tr>
            </thead>
            <tbody>
              {(viewingDelivery.delivery_items||[]).map((item: any, idx: number) => (
                <tr key={item.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                  <td style={{padding:'8px',color:'#666'}}>{idx+1}</td>
                  <td style={{padding:'8px',fontWeight:'600'}}>{item.item_name}</td>
                  <td style={{padding:'8px',textAlign:'right'}}>{item.quantity_ordered}</td>
                  <td style={{padding:'8px',textAlign:'right',fontWeight:'700',color:'#15803d'}}>{item.quantity_delivered}</td>
                  <td style={{padding:'8px',textAlign:'right',color:item.quantity_pending>0?'#dc2626':'#15803d',fontWeight:'600'}}>{item.quantity_pending}</td>
                  <td style={{padding:'8px'}}>
                    <span style={{fontSize:'12px',padding:'2px 8px',borderRadius:'8px',
                      background:item.status==='delivered'?'#dcfce7':item.status==='partial'?'#fef9c3':'#f3f4f6',
                      color:item.status==='delivered'?'#15803d':item.status==='partial'?'#854d0e':'#666'}}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewingDelivery.notes && (
            <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px',marginBottom:'16px'}}>
              <div style={{fontSize:'12px',color:'#666',marginBottom:'4px'}}>{lang==='en'?'Notes':'Maelezo'}</div>
              <div style={{fontSize:'14px'}}>{viewingDelivery.notes}</div>
            </div>
          )}

          <div style={{display:'flex',justifyContent:'flex-end',gap:'12px'}}>
            <button onClick={()=>window.print()}
              style={{padding:'10px 20px',background:'#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              🖨️ {lang==='en'?'Print':'Chapisha'}
            </button>
            <button onClick={()=>setViewingDelivery(null)}
              style={{padding:'10px 20px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Close':'Funga'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{page === 'payments' && (
  <div>
    {/* New Payment Modal */}
    {showNewPayment && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
            <h2 style={{margin:0,color:'#0a1628'}}>💰 {lang==='en'?'Record Payment':'Rekodi Malipo'}</h2>
            <button onClick={()=>setShowNewPayment(false)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          {/* Select Invoice */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Invoice *':'Invoice *'}
            </label>
            <select value={paymentInvoiceId} onChange={e=>setPaymentInvoiceId(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
              <option value="">{lang==='en'?'Select invoice':'Chagua invoice'}</option>
              {invoices.filter(inv=>inv.status !== 'paid').map(inv=>(
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number} — {inv.customers?.name} — TSh {(inv.total_amount||0).toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Show invoice balance */}
          {paymentInvoiceId && (() => {
            const inv = invoices.find(i=>i.id===parseInt(paymentInvoiceId));
            if (!inv) return null;
            const paid = payments
              .filter(p=>p.invoice_id===parseInt(paymentInvoiceId) && p.status==='confirmed')
              .reduce((sum,p)=>sum+p.amount,0);
            const balance = (inv.total_amount||0) - paid;
            return (
              <div style={{background:'#f9fafb',padding:'12px',borderRadius:'8px',marginBottom:'16px',fontSize:'13px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                  <span style={{color:'#666'}}>{lang==='en'?'Invoice Total':'Jumla ya Invoice'}:</span>
                  <span style={{fontWeight:'600'}}>TSh {(inv.total_amount||0).toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                  <span style={{color:'#666'}}>{lang==='en'?'Paid So Far':'Kilicholipwa'}:</span>
                  <span style={{fontWeight:'600',color:'#15803d'}}>TSh {paid.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'8px',borderTop:'1px solid #e5e7eb'}}>
                  <span style={{fontWeight:'700'}}>{lang==='en'?'Balance Due':'Kilichobaki'}:</span>
                  <span style={{fontWeight:'700',color:'#dc2626',fontSize:'16px'}}>TSh {balance.toLocaleString()}</span>
                </div>
              </div>
            );
          })()}

          {/* Amount */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Amount (TSh) *':'Kiasi (TSh) *'}
            </label>
            <input type="number" min="0" value={paymentAmount}
              onChange={e=>setPaymentAmount(e.target.value)}
              placeholder="0"
              style={{width:'100%',padding:'12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'16px',fontWeight:'600',boxSizing:'border-box'}}
            />
          </div>

          {/* Payment Method */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Payment Method *':'Njia ya Malipo *'}
            </label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}}>
              {[
                {key:'cash',icon:'💵',label:lang==='en'?'Cash':'Taslimu'},
                {key:'bank',icon:'🏦',label:lang==='en'?'Bank':'Benki'},
                {key:'mobile_money',icon:'📱',label:'Mobile Money'},
                {key:'wakala',icon:'🏪',label:'Wakala'},
              ].map(m=>(
                <div key={m.key} onClick={()=>setPaymentMethod(m.key)}
                  style={{padding:'10px 8px',border:`2px solid ${paymentMethod===m.key?'#0a1628':'#e5e7eb'}`,
                    borderRadius:'8px',cursor:'pointer',textAlign:'center',
                    background:paymentMethod===m.key?'#0a1628':'white',
                    color:paymentMethod===m.key?'white':'#374151',
                    transition:'all 0.2s'}}>
                  <div style={{fontSize:'20px',marginBottom:'4px'}}>{m.icon}</div>
                  <div style={{fontSize:'11px',fontWeight:'600'}}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference */}
          {paymentMethod !== 'cash' && (
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Reference Number':'Namba ya Marejeleo'}
              </label>
              <input value={paymentReference} onChange={e=>setPaymentReference(e.target.value)}
                placeholder={lang==='en'?'Transaction/Receipt number...':'Namba ya transaction...'}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
          )}

          {/* Notes */}
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Notes':'Maelezo'}
            </label>
            <input value={paymentNotes} onChange={e=>setPaymentNotes(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>

          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
            <button onClick={()=>setShowNewPayment(false)}
              style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Cancel':'Ghairi'}
            </button>
            <button onClick={submitPayment}
              style={{padding:'12px 24px',background:'#15803d',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              ✓ {lang==='en'?'Record Payment':'Rekodi Malipo'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Summary Cards */}
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'20px'}}>
      {[
        {title:lang==='en'?'Total Received':'Jumla Iliyopokelewa',
          value:`TSh ${payments.filter(p=>p.status==='confirmed').reduce((s,p)=>s+p.amount,0).toLocaleString()}`,
          icon:'💰',color:'#15803d'},
        {title:lang==='en'?'Cash Payments':'Malipo ya Cash',
          value:`TSh ${payments.filter(p=>p.payment_method==='cash'&&p.status==='confirmed').reduce((s,p)=>s+p.amount,0).toLocaleString()}`,
          icon:'💵',color:'#0a1628'},
        {title:lang==='en'?'Bank Transfers':'Uhamisho wa Benki',
          value:`TSh ${payments.filter(p=>p.payment_method==='bank'&&p.status==='confirmed').reduce((s,p)=>s+p.amount,0).toLocaleString()}`,
          icon:'🏦',color:'#1d4ed8'},
        {title:lang==='en'?'Mobile Money':'Mobile Money',
          value:`TSh ${payments.filter(p=>p.payment_method==='mobile_money'&&p.status==='confirmed').reduce((s,p)=>s+p.amount,0).toLocaleString()}`,
          icon:'📱',color:'#7c3aed'},
      ].map(card=>(
        <div key={card.title} style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',borderLeft:`4px solid ${card.color}`}}>
          <div style={{fontSize:'24px',marginBottom:'6px'}}>{card.icon}</div>
          <div style={{fontSize:'16px',fontWeight:'bold',color:card.color}}>{card.value}</div>
          <div style={{fontSize:'11px',color:'#666',marginTop:'4px'}}>{card.title}</div>
        </div>
      ))}
    </div>

    {/* Actions & Search */}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',gap:'12px',flexWrap:'wrap'}}>
      <div style={{display:'flex',gap:'12px',flex:1,flexWrap:'wrap'}}>
        <input placeholder={lang==='en'?'Search payment...':'Tafuta malipo...'}
          value={paymentSearch} onChange={e=>setPaymentSearch(e.target.value)}
          style={{flex:'1 1 200px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <select value={paymentMethodFilter} onChange={e=>setPaymentMethodFilter(e.target.value)}
          style={{padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'All methods':'Njia zote'}</option>
          <option value="cash">{lang==='en'?'Cash':'Taslimu'}</option>
          <option value="bank">{lang==='en'?'Bank':'Benki'}</option>
          <option value="mobile_money">Mobile Money</option>
          <option value="wakala">Wakala</option>
        </select>
      </div>
      <button onClick={()=>setShowNewPayment(true)}
        style={{padding:'10px 20px',background:'#15803d',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',whiteSpace:'nowrap'}}>
        + {lang==='en'?'Record Payment':'Rekodi Malipo'}
      </button>
    </div>

    {/* Unpaid Invoices Alert */}
    {invoices.filter(inv=>inv.status==='unpaid').length > 0 && (
      <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'}}>
        <span style={{fontSize:'20px'}}>⚠️</span>
        <span style={{fontSize:'13px',color:'#854d0e',fontWeight:'600'}}>
          {invoices.filter(inv=>inv.status==='unpaid').length} {lang==='en'?'unpaid invoices pending payment':'invoices zinazosubiri malipo'}
        </span>
      </div>
    )}

    {/* Payments Table */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Payments':'Malipo Yote'}</h3>
      {loadingPayments ? <p>{lang==='en'?'Loading...':'Inapakia...'}</p> :
      payments.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>💰</div>
          <div>{lang==='en'?'No payments recorded yet':'Hakuna malipo bado'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'750px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Pay #':'Namba'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Invoice':'Invoice'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Amount':'Kiasi'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Method':'Njia'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Reference':'Marejeleo'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
                <th style={{padding:'10px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              {payments
                .filter(p=>
                  (!paymentSearch || p.payment_number?.includes(paymentSearch) || p.customers?.name?.toLowerCase().includes(paymentSearch.toLowerCase())) &&
                  (!paymentMethodFilter || p.payment_method === paymentMethodFilter)
                )
                .map(p=>{
                  const methodColors: any = {
                    cash:{bg:'#dcfce7',color:'#15803d',icon:'💵'},
                    bank:{bg:'#dbeafe',color:'#1d4ed8',icon:'🏦'},
                    mobile_money:{bg:'#f3e8ff',color:'#7c3aed',icon:'📱'},
                    wakala:{bg:'#fef9c3',color:'#854d0e',icon:'🏪'},
                  };
                  const mc = methodColors[p.payment_method]||{bg:'#f3f4f6',color:'#666',icon:'💰'};
                  return (
                    <tr key={p.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px',opacity:p.status==='cancelled'?0.5:1}}>
                      <td style={{padding:'10px 8px',fontWeight:'700',fontFamily:'monospace',color:'#0a1628'}}>{p.payment_number}</td>
                      <td style={{padding:'10px 8px',fontFamily:'monospace',color:'#666',fontSize:'12px'}}>{p.invoices?.invoice_number}</td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{p.customers?.name}</td>
                      <td style={{padding:'10px 8px',fontWeight:'700',color:'#15803d',fontSize:'15px'}}>
                        TSh {(p.amount||0).toLocaleString()}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{background:mc.bg,color:mc.color,padding:'4px 10px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {mc.icon} {p.payment_method?.replace('_',' ')}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>{p.reference_number||'-'}</td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                        {p.payment_date ? new Date(p.payment_date).toLocaleDateString() : '-'}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{
                          background:p.status==='confirmed'?'#dcfce7':p.status==='cancelled'?'#f3f4f6':'#fef9c3',
                          color:p.status==='confirmed'?'#15803d':p.status==='cancelled'?'#6b7280':'#854d0e',
                          padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        {p.status === 'confirmed' && (
                          <button onClick={()=>cancelPayment(p.id)}
                            style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'12px'}}>
                            {lang==='en'?'Cancel':'Ghairi'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}

{page === 'wakala' && (
  <div>
    {/* New Transaction Modal */}
    {showNewWakala && (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'1000px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
            <h2 style={{margin:0,color:'#0a1628'}}>📱 {lang==='en'?'New Transaction':'Transaction Mpya'}</h2>
            <button onClick={()=>setShowNewWakala(false)} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color:'#666'}}>×</button>
          </div>

          {/* Transaction Type */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'8px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Transaction Type *':'Aina ya Transaction *'}
            </label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}}>
              {[
                {key:'deposit',icon:'⬇️',label:lang==='en'?'Deposit':'Amana'},
                {key:'withdrawal',icon:'⬆️',label:lang==='en'?'Withdrawal':'Kutoa'},
                {key:'transfer',icon:'↔️',label:lang==='en'?'Transfer':'Uhamisho'},
                {key:'bank_payment',icon:'🏦',label:lang==='en'?'Bank Pay':'Lipa Benki'},
              ].map(t=>(
                <div key={t.key} onClick={()=>setWkType(t.key)}
                  style={{padding:'10px 6px',border:`2px solid ${wkType===t.key?'#0a1628':'#e5e7eb'}`,
                    borderRadius:'8px',cursor:'pointer',textAlign:'center',
                    background:wkType===t.key?'#0a1628':'white',
                    color:wkType===t.key?'white':'#374151'}}>
                  <div style={{fontSize:'20px',marginBottom:'4px'}}>{t.icon}</div>
                  <div style={{fontSize:'11px',fontWeight:'600'}}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Network */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Network *':'Mtandao *'}
            </label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'8px'}}>
              {['M-Pesa','Tigo Pesa','Halopesa','Airtel','NMB','CRDB','NBC'].map(n=>(
                <div key={n} onClick={()=>setWkNetwork(n)}
                  style={{padding:'8px 4px',border:`2px solid ${wkNetwork===n?'#c9a84c':'#e5e7eb'}`,
                    borderRadius:'8px',cursor:'pointer',textAlign:'center',fontSize:'11px',fontWeight:'600',
                    background:wkNetwork===n?'#c9a84c':'white',
                    color:wkNetwork===n?'white':'#374151'}}>
                  {n}
                </div>
              ))}
            </div>
          </div>

          {/* Branch */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Branch *':'Tawi *'}
            </label>
            <select value={wkBranch} onChange={e=>setWkBranch(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
              <option value="">{lang==='en'?'Select branch':'Chagua tawi'}</option>
              {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          {/* Customer Info */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
            <div>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Customer Name *':'Jina la Mteja *'}
              </label>
              <input value={wkCustName} onChange={e=>setWkCustName(e.target.value)}
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
            <div>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Phone Number':'Namba ya Simu'}
              </label>
              <input value={wkCustPhone} onChange={e=>setWkCustPhone(e.target.value)}
                placeholder="07xx xxx xxx"
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
          </div>

          {/* Amount & Commission */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
            <div>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Amount (TSh) *':'Kiasi (TSh) *'}
              </label>
              <input type="number" min="0" value={wkAmount} onChange={e=>setWkAmount(e.target.value)}
                placeholder="0"
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
            <div>
              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
                {lang==='en'?'Commission (TSh)':'Kamisheni (TSh)'}
              </label>
              <input type="number" min="0" value={wkCommission} onChange={e=>setWkCommission(e.target.value)}
                placeholder="0"
                style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
              />
            </div>
          </div>

          {/* Reference */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Transaction Reference':'Namba ya Transaction'}
            </label>
            <input value={wkReference} onChange={e=>setWkReference(e.target.value)}
              placeholder={lang==='en'?'Reference from network...':'Namba kutoka mtandaoni...'}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>

          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
            <button onClick={()=>setShowNewWakala(false)}
              style={{padding:'12px 24px',background:'#f3f4f6',color:'#374151',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              {lang==='en'?'Cancel':'Ghairi'}
            </button>
            <button onClick={submitWakala}
              style={{padding:'12px 24px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              ✓ {lang==='en'?'Record Transaction':'Rekodi Transaction'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Summary Cards */}
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'20px'}}>
      {[
        {title:lang==='en'?'Total Transactions':'Jumla ya Transactions',value:wakalaSummary.count||0,icon:'📊',color:'#0a1628',isCount:true},
        {title:lang==='en'?'Total Volume':'Jumla ya Fedha',value:`TSh ${(wakalaSummary.totalAmount||0).toLocaleString()}`,icon:'💸',color:'#1d4ed8'},
        {title:lang==='en'?'Total Commission':'Kamisheni Yote',value:`TSh ${(wakalaSummary.totalCommission||0).toLocaleString()}`,icon:'💰',color:'#15803d'},
        {title:lang==='en'?'Avg Commission':'Wastani wa Kamisheni',value:`TSh ${wakalaSummary.count?Math.round((wakalaSummary.totalCommission||0)/(wakalaSummary.count||1)).toLocaleString():0}`,icon:'📈',color:'#b45309'},
      ].map(card=>(
        <div key={card.title} style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',borderLeft:`4px solid ${card.color}`}}>
          <div style={{fontSize:'24px',marginBottom:'6px'}}>{card.icon}</div>
          <div style={{fontSize:card.isCount?'28px':'16px',fontWeight:'bold',color:card.color}}>{card.value}</div>
          <div style={{fontSize:'11px',color:'#666',marginTop:'4px'}}>{card.title}</div>
        </div>
      ))}
    </div>

    {/* Search & Add */}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',gap:'12px',flexWrap:'wrap'}}>
      <div style={{display:'flex',gap:'12px',flex:1,flexWrap:'wrap'}}>
        <input placeholder={lang==='en'?'Search transaction...':'Tafuta transaction...'}
          value={wkSearch} onChange={e=>setWkSearch(e.target.value)}
          style={{flex:'1 1 200px',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}
        />
        <select value={wkTypeFilter} onChange={e=>setWkTypeFilter(e.target.value)}
          style={{padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'All types':'Aina zote'}</option>
          <option value="deposit">{lang==='en'?'Deposit':'Amana'}</option>
          <option value="withdrawal">{lang==='en'?'Withdrawal':'Kutoa'}</option>
          <option value="transfer">{lang==='en'?'Transfer':'Uhamisho'}</option>
          <option value="bank_payment">{lang==='en'?'Bank Payment':'Lipa Benki'}</option>
        </select>
      </div>
      <button onClick={()=>setShowNewWakala(true)}
        style={{padding:'10px 20px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',whiteSpace:'nowrap'}}>
        + {lang==='en'?'New Transaction':'Transaction Mpya'}
      </button>
    </div>

    {/* Transactions Table */}
    <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Transactions':'Transactions Zote'}</h3>
      {loadingWakala ? <p>{lang==='en'?'Loading...':'Inapakia...'}</p> :
      wakalaTxns.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px',color:'#999'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>📱</div>
          <div>{lang==='en'?'No transactions yet':'Hakuna transactions bado'}</div>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'850px'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'2px solid #eee',fontSize:'13px',color:'#666'}}>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Ref #':'Namba'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Type':'Aina'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Network':'Mtandao'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Customer':'Mteja'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Phone':'Simu'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Amount':'Kiasi'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Commission':'Kamisheni'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Date':'Tarehe'}</th>
                <th style={{padding:'10px 8px'}}>{lang==='en'?'Status':'Hali'}</th>
              </tr>
            </thead>
            <tbody>
              {wakalaTxns
                .filter(t=>
                  (!wkSearch || t.transaction_number?.includes(wkSearch) || t.customer_name?.toLowerCase().includes(wkSearch.toLowerCase()) || (t.customer_phone||'').includes(wkSearch)) &&
                  (!wkTypeFilter || t.transaction_type === wkTypeFilter)
                )
                .map(t=>{
                  const typeColors: any = {
                    deposit:{bg:'#dcfce7',color:'#15803d',icon:'⬇️'},
                    withdrawal:{bg:'#fee2e2',color:'#dc2626',icon:'⬆️'},
                    transfer:{bg:'#dbeafe',color:'#1d4ed8',icon:'↔️'},
                    bank_payment:{bg:'#fef9c3',color:'#854d0e',icon:'🏦'},
                  };
                  const tc = typeColors[t.transaction_type]||{bg:'#f3f4f6',color:'#666',icon:'💰'};
                  return (
                    <tr key={t.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px',opacity:t.status==='cancelled'||t.status==='reversed'?0.5:1}}>
                      <td style={{padding:'10px 8px',fontWeight:'700',fontFamily:'monospace',color:'#0a1628',fontSize:'12px'}}>{t.transaction_number}</td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{background:tc.bg,color:tc.color,padding:'4px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {tc.icon} {t.transaction_type?.replace('_',' ')}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{background:'#f3f4f6',padding:'4px 8px',borderRadius:'8px',fontSize:'12px',fontWeight:'600'}}>
                          {t.network}
                        </span>
                      </td>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{t.customer_name}</td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>{t.customer_phone||'-'}</td>
                      <td style={{padding:'10px 8px',fontWeight:'700',color:'#0a1628'}}>TSh {(t.amount||0).toLocaleString()}</td>
                      <td style={{padding:'10px 8px',fontWeight:'600',color:'#15803d'}}>TSh {(t.commission||0).toLocaleString()}</td>
                      <td style={{padding:'10px 8px',fontSize:'12px'}}>{t.branches?.name||'-'}</td>
                      <td style={{padding:'10px 8px',fontSize:'12px',color:'#666'}}>
                        {t.transaction_date ? new Date(t.transaction_date).toLocaleDateString() : '-'}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <select value={t.status} onChange={e=>updateWakalaStatus(t.id,e.target.value)}
                          style={{
                            background:t.status==='completed'?'#dcfce7':t.status==='reversed'?'#fee2e2':'#f3f4f6',
                            color:t.status==='completed'?'#15803d':t.status==='reversed'?'#dc2626':'#6b7280',
                            border:'none',borderRadius:'12px',padding:'4px 8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                          <option value="completed">{lang==='en'?'Completed':'Imekamilika'}</option>
                          <option value="cancelled">{lang==='en'?'Cancelled':'Imefutwa'}</option>
                          <option value="reversed">{lang==='en'?'Reversed':'Imerudishwa'}</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}

{page === 'reports' && (() => {
  // Filter by period
  const now = new Date();
  const filterDate = (dateStr: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    if (reportPeriod === 'today') return date.toDateString() === now.toDateString();
    if (reportPeriod === 'week') return (now.getTime() - date.getTime()) <= 7*24*60*60*1000;
    if (reportPeriod === 'month') return date.getMonth()===now.getMonth() && date.getFullYear()===now.getFullYear();
    if (reportPeriod === 'year') return date.getFullYear()===now.getFullYear();
    return true;
  };

  const filteredOrders = orders.filter(o =>
    filterDate(o.created_at) && (!reportBranch || o.branch_id === parseInt(reportBranch))
  );
  const filteredPayments = payments.filter(p =>
    filterDate(p.created_at) && p.status === 'confirmed' && (!reportBranch || p.branch_id === parseInt(reportBranch))
  );
  const filteredInvoices = invoices.filter(inv =>
    filterDate(inv.created_at) && (!reportBranch || inv.branch_id === parseInt(reportBranch))
  );
  const filteredWakala = wakalaTxns.filter(t =>
    filterDate(t.created_at) && t.status === 'completed' && (!reportBranch || t.branch_id === parseInt(reportBranch))
  );

  const totalRevenue = filteredPayments.reduce((s,p)=>s+p.amount,0);
  const totalOrders = filteredOrders.length;
  const completedOrders = filteredOrders.filter(o=>o.status==='completed').length;
  const pendingOrders = filteredOrders.filter(o=>['received','processing','pending'].includes(o.status)).length;
  const totalInvoiced = filteredInvoices.reduce((s,inv)=>s+inv.total_amount,0);
  const unpaidInvoices = filteredInvoices.filter(inv=>inv.status==='unpaid').length;
  const wakalaVolume = filteredWakala.reduce((s,t)=>s+t.amount,0);
  const wakalaCommission = filteredWakala.reduce((s,t)=>s+t.commission,0);

  // Order status breakdown
  const statusBreakdown = ['received','processing','pending','ready','dispatched','completed','cancelled'].map(s=>({
    status: s,
    count: filteredOrders.filter(o=>o.status===s).length,
    colors: {
      received:'#1d4ed8', processing:'#854d0e', pending:'#dc2626',
      ready:'#065f46', dispatched:'#3730a3', completed:'#15803d', cancelled:'#6b7280'
    }
  }));

  // Branch performance
  const branchPerformance = branches.map(b=>({
    name: b.name,
    orders: filteredOrders.filter(o=>o.branch_id===b.id).length,
    revenue: filteredPayments.filter(p=>p.branch_id===b.id).reduce((s,p)=>s+p.amount,0),
  })).sort((a,b)=>b.revenue-a.revenue);

  // Payment methods breakdown
  const paymentMethods = ['cash','bank','mobile_money','wakala'].map(m=>({
    method: m,
    amount: filteredPayments.filter(p=>p.payment_method===m).reduce((s,p)=>s+p.amount,0),
    count: filteredPayments.filter(p=>p.payment_method===m).length,
    icon: m==='cash'?'💵':m==='bank'?'🏦':m==='mobile_money'?'📱':'🏪',
    color: m==='cash'?'#15803d':m==='bank'?'#1d4ed8':m==='mobile_money'?'#7c3aed':'#854d0e'
  }));

  const maxRevenue = Math.max(...branchPerformance.map(b=>b.revenue), 1);

  return (
    <div>
      {/* Filters */}
      <div style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px',display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {[
            {key:'today',label:lang==='en'?'Today':'Leo'},
            {key:'week',label:lang==='en'?'This Week':'Wiki Hii'},
            {key:'month',label:lang==='en'?'This Month':'Mwezi Huu'},
            {key:'year',label:lang==='en'?'This Year':'Mwaka Huu'},
            {key:'all',label:lang==='en'?'All Time':'Yote'},
          ].map(p=>(
            <button key={p.key} onClick={()=>setReportPeriod(p.key)}
              style={{padding:'8px 16px',borderRadius:'20px',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:'600',
                background:reportPeriod===p.key?'#0a1628':'#f3f4f6',
                color:reportPeriod===p.key?'white':'#374151'}}>
              {p.label}
            </button>
          ))}
        </div>
        <select value={reportBranch} onChange={e=>setReportBranch(e.target.value)}
          style={{padding:'8px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px'}}>
          <option value="">{lang==='en'?'All Branches':'Matawi Yote'}</option>
          {branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <button onClick={()=>window.print()}
          style={{marginLeft:'auto',padding:'8px 16px',background:'#c9a84c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
          🖨️ {lang==='en'?'Print Report':'Chapisha Ripoti'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'20px'}}>
        {[
          {title:lang==='en'?'Total Revenue':'Jumla ya Mapato',value:`TSh ${totalRevenue.toLocaleString()}`,icon:'💰',color:'#15803d',sub:`${filteredPayments.length} ${lang==='en'?'payments':'malipo'}`},
          {title:lang==='en'?'Total Orders':'Jumla ya Orders',value:totalOrders,icon:'📦',color:'#0a1628',sub:`${completedOrders} ${lang==='en'?'completed':'zilizokamilika'}`},
          {title:lang==='en'?'Total Invoiced':'Jumla ya Invoice',value:`TSh ${totalInvoiced.toLocaleString()}`,icon:'🧾',color:'#1d4ed8',sub:`${unpaidInvoices} ${lang==='en'?'unpaid':'hazijalipiwa'}`},
          {title:lang==='en'?'Wakala Volume':'Kiasi cha Wakala',value:`TSh ${wakalaVolume.toLocaleString()}`,icon:'📱',color:'#7c3aed',sub:`TSh ${wakalaCommission.toLocaleString()} ${lang==='en'?'commission':'kamisheni'}`},
        ].map(card=>(
          <div key={card.title} style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',borderLeft:`4px solid ${card.color}`}}>
            <div style={{fontSize:'28px',marginBottom:'6px'}}>{card.icon}</div>
            <div style={{fontSize:'20px',fontWeight:'bold',color:card.color}}>{card.value}</div>
            <div style={{fontSize:'12px',color:'#666',marginTop:'4px'}}>{card.title}</div>
            <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
        {/* Order Status Breakdown */}
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628',fontSize:'15px'}}>📊 {lang==='en'?'Orders by Status':'Orders kwa Hali'}</h3>
          {statusBreakdown.map(s=>(
            <div key={s.status} style={{marginBottom:'12px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',fontSize:'13px'}}>
                <span style={{textTransform:'capitalize',color:'#374151'}}>{s.status}</span>
                <span style={{fontWeight:'700',color:(s.colors as any)[s.status]}}>{s.count}</span>
              </div>
              <div style={{background:'#f3f4f6',borderRadius:'4px',height:'8px',overflow:'hidden'}}>
                <div style={{
                  width: totalOrders > 0 ? `${(s.count/totalOrders)*100}%` : '0%',
                  height:'100%',
                  background:(s.colors as any)[s.status],
                  borderRadius:'4px',
                  transition:'width 0.5s'
                }}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'16px',paddingTop:'16px',borderTop:'1px solid #e5e7eb',display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
            <span style={{color:'#666'}}>{lang==='en'?'Pending orders':'Orders zinazosubiri'}</span>
            <span style={{fontWeight:'700',color:'#dc2626'}}>{pendingOrders}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628',fontSize:'15px'}}>💳 {lang==='en'?'Revenue by Payment Method':'Mapato kwa Njia ya Malipo'}</h3>
          {paymentMethods.map(m=>(
            <div key={m.method} style={{marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{fontSize:'18px'}}>{m.icon}</span>
                  <span style={{fontSize:'13px',textTransform:'capitalize',color:'#374151'}}>{m.method.replace('_',' ')}</span>
                  <span style={{fontSize:'11px',color:'#999'}}>({m.count})</span>
                </div>
                <span style={{fontWeight:'700',color:m.color,fontSize:'13px'}}>TSh {m.amount.toLocaleString()}</span>
              </div>
              <div style={{background:'#f3f4f6',borderRadius:'4px',height:'6px',overflow:'hidden'}}>
                <div style={{
                  width: totalRevenue > 0 ? `${(m.amount/totalRevenue)*100}%` : '0%',
                  height:'100%',background:m.color,borderRadius:'4px'
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Performance */}
      <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
        <h3 style={{margin:'0 0 16px',color:'#0a1628',fontSize:'15px'}}>🏢 {lang==='en'?'Branch Performance':'Utendaji wa Matawi'}</h3>
        {branchPerformance.length === 0 ? (
          <p style={{color:'#999',textAlign:'center'}}>{lang==='en'?'No data yet':'Hakuna data bado'}</p>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'500px'}}>
              <thead>
                <tr style={{fontSize:'12px',color:'#666',borderBottom:'2px solid #eee',textAlign:'left'}}>
                  <th style={{padding:'8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
                  <th style={{padding:'8px'}}>{lang==='en'?'Orders':'Orders'}</th>
                  <th style={{padding:'8px'}}>{lang==='en'?'Revenue':'Mapato'}</th>
                  <th style={{padding:'8px',width:'40%'}}>{lang==='en'?'Performance':'Utendaji'}</th>
                </tr>
              </thead>
              <tbody>
                {branchPerformance.map((b,i)=>(
                  <tr key={b.name} style={{borderBottom:'1px solid #f0f0f0'}}>
                    <td style={{padding:'10px 8px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        {i===0 && <span>🥇</span>}
                        {i===1 && <span>🥈</span>}
                        {i===2 && <span>🥉</span>}
                        {i>2 && <span style={{color:'#999',fontSize:'13px'}}>#{i+1}</span>}
                        <span style={{fontWeight:'600',fontSize:'14px'}}>{b.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'10px 8px'}}>
                      <span style={{background:'#f3f4f6',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>{b.orders}</span>
                    </td>
                    <td style={{padding:'10px 8px',fontWeight:'700',color:'#15803d'}}>TSh {b.revenue.toLocaleString()}</td>
                    <td style={{padding:'10px 8px'}}>
                      <div style={{background:'#f3f4f6',borderRadius:'4px',height:'10px',overflow:'hidden'}}>
                        <div style={{
                          width:`${(b.revenue/maxRevenue)*100}%`,
                          height:'100%',
                          background:`hsl(${220-(i*30)},70%,45%)`,
                          borderRadius:'4px'
                        }}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        {/* Top Customers */}
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628',fontSize:'15px'}}>🤝 {lang==='en'?'Top Customers':'Wateja Wakubwa'}</h3>
          {(() => {
            const custOrders = customers.map(c=>({
              name: c.name,
              type: c.type,
              orders: filteredOrders.filter(o=>o.customer_id===c.id).length,
              revenue: filteredPayments.filter(p=>p.customer_id===c.id).reduce((s,p)=>s+p.amount,0)
            })).filter(c=>c.orders>0).sort((a,b)=>b.revenue-a.revenue).slice(0,5);
            return custOrders.length === 0 ? (
              <p style={{color:'#999',fontSize:'13px',textAlign:'center'}}>
                {lang==='en'?'No data yet':'Hakuna data bado'}
              </p>
            ) : custOrders.map((c,i)=>(
              <div key={c.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div>
                  <div style={{fontWeight:'600',fontSize:'13px'}}>{c.name}</div>
                  <div style={{fontSize:'11px',color:'#999'}}>{c.type} • {c.orders} orders</div>
                </div>
                <div style={{fontWeight:'700',color:'#15803d',fontSize:'13px'}}>TSh {c.revenue.toLocaleString()}</div>
              </div>
            ));
          })()}
        </div>

        {/* Summary Stats */}
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628',fontSize:'15px'}}>📋 {lang==='en'?'Summary':'Muhtasari'}</h3>
          {[
            {label:lang==='en'?'Total Customers':'Jumla ya Wateja', value:customers.length, icon:'🤝'},
            {label:lang==='en'?'Active Staff':'Wafanyakazi Wanaofanya Kazi', value:staff.filter(s=>s.is_active).length, icon:'👥'},
            {label:lang==='en'?'Total Branches':'Jumla ya Matawi', value:branches.length, icon:'🏢'},
            {label:lang==='en'?'Invoiced Amount':'Kiasi Kilichoinvoiciwa', value:`TSh ${totalInvoiced.toLocaleString()}`, icon:'🧾'},
            {label:lang==='en'?'Revenue Collected':'Mapato Yaliyokusanywa', value:`TSh ${totalRevenue.toLocaleString()}`, icon:'💰'},
            {label:lang==='en'?'Outstanding Balance':'Deni Linalobaki', value:`TSh ${(totalInvoiced-totalRevenue).toLocaleString()}`, icon:'⚠️'},
            {label:lang==='en'?'Wakala Transactions':'Transactions za Wakala', value:filteredWakala.length, icon:'📱'},
            {label:lang==='en'?'Wakala Commission':'Kamisheni ya Wakala', value:`TSh ${wakalaCommission.toLocaleString()}`, icon:'💵'},
          ].map(s=>(
            <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span>{s.icon}</span>
                <span style={{fontSize:'13px',color:'#374151'}}>{s.label}</span>
              </div>
              <span style={{fontWeight:'700',fontSize:'13px',color:'#0a1628'}}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
})()}

{page === 'settings' && (
  <div>
    {/* Settings Tabs */}
    <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
      {[
        {key:'company',icon:'🏢',label:lang==='en'?'Company Info':'Taarifa ya Kampuni'},
        {key:'accounts',icon:'👤',label:lang==='en'?'User Accounts':'Akaunti za Watumiaji'},
        {key:'roles',icon:'🎭',label:lang==='en'?'Roles':'Majukumu'},
        {key:'system',icon:'⚙️',label:lang==='en'?'System':'Mfumo'},
      ].map(t=>(
        <button key={t.key} onClick={()=>setSettingsTab(t.key)}
          style={{padding:'10px 20px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:'600',
            background:settingsTab===t.key?'#0a1628':'white',
            color:settingsTab===t.key?'white':'#374151',
            boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>

    {/* Company Info Tab */}
    {settingsTab === 'company' && (
      <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',color:'#0a1628'}}>{lang==='en'?'Company Information':'Taarifa ya Kampuni'}</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
          <div>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Company Name':'Jina la Kampuni'}
            </label>
            <input value={companyName} onChange={e=>setCompanyName(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Phone':'Simu'}
            </label>
            <input value={companyPhone} onChange={e=>setCompanyPhone(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Email':'Barua Pepe'}
            </label>
            <input value={companyEmail} onChange={e=>setCompanyEmail(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Address':'Anwani'}
            </label>
            <input value={companyAddress} onChange={e=>setCompanyAddress(e.target.value)}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
          </div>
        </div>

        {/* Company Preview Card */}
        <div style={{background:'linear-gradient(135deg,#0a1628,#1a2f55)',borderRadius:'12px',padding:'24px',marginBottom:'20px',color:'white'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'60px',height:'60px',background:'#c9a84c',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'20px',color:'#0a1628'}}>JCL</div>
            <div>
              <div style={{fontWeight:'bold',fontSize:'18px'}}>{companyName}</div>
              <div style={{color:'#c9a84c',fontSize:'13px'}}>Supply Management System</div>
              {companyPhone && <div style={{fontSize:'12px',color:'#cbd5e1',marginTop:'4px'}}>📞 {companyPhone}</div>}
              {companyEmail && <div style={{fontSize:'12px',color:'#cbd5e1'}}>✉️ {companyEmail}</div>}
              {companyAddress && <div style={{fontSize:'12px',color:'#cbd5e1'}}>📍 {companyAddress}</div>}
            </div>
          </div>
        </div>

        <button onClick={saveCompanySettings} disabled={savingSettings}
          style={{padding:'12px 24px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
          💾 {savingSettings ? '...' : (lang==='en'?'Save Settings':'Hifadhi Mipangilio')}
</button>
      </div>
    )}

    {/* User Accounts Tab */}
    {settingsTab === 'accounts' && (
      <div>
               {/* Create Account */}
        <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'20px'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Create Staff Account':'Unda Akaunti ya Mfanyakazi'}</h3>
          <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:'8px',padding:'12px',marginBottom:'16px',fontSize:'13px',color:'#854d0e'}}>
            ⚠️ {lang==='en'?'Search for a staff member already registered, then set a password to give them login access.':'Tafuta mfanyakazi aliyeshasajiliwa, kisha mpe password ili aweze kuingia.'}
          </div>

          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
              {lang==='en'?'Search Staff by Name *':'Tafuta Mfanyakazi kwa Jina *'}
            </label>
            <input
              value={staffAccountSearch}
              onChange={e=>{setStaffAccountSearch(e.target.value); setSelectedStaffAccount(null);}}
              placeholder={lang==='en'?'Type staff name...':'Andika jina la mfanyakazi...'}
              style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
            />
            {staffAccountSearch && !selectedStaffAccount && (
              <div style={{border:'1px solid #e5e7eb',borderRadius:'8px',marginTop:'6px',maxHeight:'180px',overflowY:'auto'}}>
                {staff.filter(s=>s.full_name?.toLowerCase().includes(staffAccountSearch.toLowerCase())).length === 0 ? (
                  <div style={{padding:'10px',fontSize:'13px',color:'#999'}}>{lang==='en'?'No staff found':'Hakuna mfanyakazi aliyepatikana'}</div>
                ) : staff.filter(s=>s.full_name?.toLowerCase().includes(staffAccountSearch.toLowerCase())).map(s=>(
                  <div key={s.id} onClick={()=>{setSelectedStaffAccount(s); setStaffAccountSearch(s.full_name);}}
                    style={{padding:'10px',cursor:'pointer',borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                    <div style={{fontWeight:'600'}}>{s.full_name}</div>
                    <div style={{fontSize:'12px',color:'#666'}}>{s.email || (lang==='en'?'No email on file':'Hana barua pepe')} — {s.roles?.name || '-'} — {s.branches?.name || '-'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedStaffAccount && (
            <div style={{background:'#f9fafb',borderRadius:'8px',padding:'16px',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                <div>
                  <div style={{fontWeight:'700',fontSize:'15px',color:'#0a1628'}}>{selectedStaffAccount.full_name}</div>
                  <div style={{fontSize:'13px',color:'#666'}}>{selectedStaffAccount.roles?.name || '-'} — {selectedStaffAccount.branches?.name || '-'}</div>
                </div>
                <button onClick={()=>{setSelectedStaffAccount(null); setStaffAccountSearch('');}}
                  style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'13px'}}>
                  {lang==='en'?'Change':'Badilisha'}
                </button>
              </div>

              {!selectedStaffAccount.email ? (
                <div style={{background:'#fee2e2',color:'#dc2626',padding:'10px',borderRadius:'8px',fontSize:'13px'}}>
                  {lang==='en'?'This staff has no email on file. Please add an email via the Staff page first.':'Mfanyakazi huyu hana barua pepe. Tafadhali ongeza barua pepe kupitia page ya Staff kwanza.'}
                </div>
              ) : (
                <>
                  <div style={{marginBottom:'4px',fontSize:'13px',color:'#666'}}>
                    {lang==='en'?'Email (login)':'Barua Pepe (kuingia)'}: <strong>{selectedStaffAccount.email}</strong>
                  </div>
                  <div style={{marginTop:'12px'}}>
                    <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'13px',color:'#374151'}}>
                      {lang==='en'?'Set Password *':'Weka Password *'}
                    </label>
                    <input type="password" value={newUserPassword} onChange={e=>setNewUserPassword(e.target.value)}
                      placeholder={lang==='en'?'Min 6 characters':'Angalau herufi 6'}
                      style={{width:'100%',padding:'10px',border:'2px solid #e5e7eb',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <button onClick={createStaffAccount} disabled={creatingUser || !selectedStaffAccount || !selectedStaffAccount?.email}
            style={{padding:'12px 24px',background:(creatingUser || !selectedStaffAccount || !selectedStaffAccount?.email)?'#9ca3af':'#0a1628',color:'white',border:'none',borderRadius:'8px',cursor:(creatingUser || !selectedStaffAccount || !selectedStaffAccount?.email)?'not-allowed':'pointer',fontWeight:'bold'}}>
            {creatingUser?(lang==='en'?'Creating...':'Inaunda...'):(lang==='en'?'Create Account':'Unda Akaunti')}
          </button>
        </div>

        {/* Staff List */}
        <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'All Staff Accounts':'Akaunti za Wafanyakazi'}</h3>
          {staff.length === 0 ? (
            <p style={{color:'#999',textAlign:'center'}}>{lang==='en'?'No staff yet':'Hakuna wafanyakazi bado'}</p>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
                <thead>
                  <tr style={{fontSize:'12px',color:'#666',borderBottom:'2px solid #eee',textAlign:'left'}}>
                    <th style={{padding:'8px'}}>{lang==='en'?'Name':'Jina'}</th>
                    <th style={{padding:'8px'}}>{lang==='en'?'Email':'Barua Pepe'}</th>
                    <th style={{padding:'8px'}}>{lang==='en'?'Role':'Jukumu'}</th>
                    <th style={{padding:'8px'}}>{lang==='en'?'Branch':'Tawi'}</th>
                    <th style={{padding:'8px'}}>{lang==='en'?'Type':'Aina'}</th>
                    <th style={{padding:'8px'}}>{lang==='en'?'Status':'Hali'}</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(s=>(
                    <tr key={s.id} style={{borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
                      <td style={{padding:'10px 8px',fontWeight:'600'}}>{s.full_name}</td>
                      <td style={{padding:'10px 8px',fontSize:'13px',color:'#666'}}>{s.email}</td>
                      <td style={{padding:'10px 8px'}}>{s.roles?.name||'-'}</td>
                      <td style={{padding:'10px 8px'}}>{s.branches?.name||'-'}</td>
                      <td style={{padding:'10px 8px'}}>
                        {s.is_director ? (
                          <span style={{background:'#fef9c3',color:'#854d0e',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>👑 Director</span>
                        ) : (
                          <span style={{background:'#f3f4f6',color:'#374151',padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>👤 Staff</span>
                        )}
                      </td>
                      <td style={{padding:'10px 8px'}}>
                        <span style={{
                          background:s.is_active?'#dcfce7':'#fee2e2',
                          color:s.is_active?'#15803d':'#dc2626',
                          padding:'2px 8px',borderRadius:'12px',fontSize:'12px',fontWeight:'600'}}>
                          {s.is_active?(lang==='en'?'Active':'Amilifu'):(lang==='en'?'Inactive':'Haafanyi')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Roles Tab */}
    {settingsTab === 'roles' && (
      <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Staff Roles':'Majukumu ya Wafanyakazi'}</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
          {roles.map(r=>(
            <div key={r.id} style={{border:'2px solid #e5e7eb',borderRadius:'12px',padding:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
                <div style={{fontWeight:'700',fontSize:'15px',color:'#0a1628'}}>{r.name}</div>
                <span style={{
                  background:r.is_active?'#dcfce7':'#fee2e2',
                  color:r.is_active?'#15803d':'#dc2626',
                  padding:'2px 8px',borderRadius:'12px',fontSize:'11px',fontWeight:'600'}}>
                  {r.is_active?(lang==='en'?'Active':'Amilifu'):(lang==='en'?'Inactive':'Haafanyi')}
                </span>
              </div>
              {r.description && <p style={{fontSize:'13px',color:'#666',margin:'0 0 8px'}}>{r.description}</p>}
              <div style={{fontSize:'12px',color:'#999'}}>
                {staff.filter(s=>s.role_id===r.id).length} {lang==='en'?'staff members':'wafanyakazi'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* System Tab */}
    {settingsTab === 'system' && (
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        {/* System Info */}
        <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'System Information':'Taarifa ya Mfumo'}</h3>
          {[
            {label:lang==='en'?'System Name':'Jina la Mfumo', value:'Joleo Supply Manager'},
            {label:'Version', value:'1.0.0'},
            {label:lang==='en'?'Database':'Hifadhidata', value:'Supabase PostgreSQL'},
            {label:lang==='en'?'Total Branches':'Jumla ya Matawi', value:branches.length},
            {label:lang==='en'?'Total Staff':'Jumla ya Wafanyakazi', value:staff.length},
            {label:lang==='en'?'Total Customers':'Jumla ya Wateja', value:customers.length},
            {label:lang==='en'?'Total Orders':'Jumla ya Orders', value:orders.length},
            {label:lang==='en'?'Total Invoices':'Jumla ya Invoices', value:invoices.length},
          ].map(item=>(
            <div key={item.label} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f0f0f0',fontSize:'14px'}}>
              <span style={{color:'#666'}}>{item.label}</span>
              <span style={{fontWeight:'600',color:'#0a1628'}}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Language & Preferences */}
        <div style={{background:'white',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{margin:'0 0 16px',color:'#0a1628'}}>{lang==='en'?'Preferences':'Mapendeleo'}</h3>
          
          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block',marginBottom:'8px',fontWeight:'600',fontSize:'14px',color:'#374151'}}>
              {lang==='en'?'Default Language':'Lugha ya Kawaida'}
            </label>
            <div style={{display:'flex',gap:'12px'}}>
              {[
                {key:'en',label:'🇬🇧 English'},
                {key:'sw',label:'🇹🇿 Kiswahili'},
              ].map(l=>(
                <div key={l.key} onClick={()=>setLang(l.key)}
                  style={{flex:1,padding:'12px',border:`2px solid ${lang===l.key?'#0a1628':'#e5e7eb'}`,
                    borderRadius:'8px',cursor:'pointer',textAlign:'center',fontWeight:'600',fontSize:'14px',
                    background:lang===l.key?'#0a1628':'white',
                    color:lang===l.key?'white':'#374151'}}>
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{background:'#f9fafb',borderRadius:'8px',padding:'16px',marginBottom:'16px'}}>
            <h4 style={{margin:'0 0 12px',color:'#0a1628',fontSize:'14px'}}>{lang==='en'?'Quick Stats':'Takwimu za Haraka'}</h4>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {[
                {label:lang==='en'?'Paid Invoices':'Invoices Zilizolipwa', value:invoices.filter(i=>i.status==='paid').length, color:'#15803d'},
                {label:lang==='en'?'Unpaid Invoices':'Invoices za Deni', value:invoices.filter(i=>i.status==='unpaid').length, color:'#dc2626'},
                {label:lang==='en'?'Active Customers':'Wateja Wanaotumia', value:customers.filter(c=>c.is_active).length, color:'#1d4ed8'},
                {label:lang==='en'?'HQ Branches':'Matawi ya HQ', value:branches.filter(b=>b.is_headquarter).length, color:'#854d0e'},
              ].map(s=>(
                <div key={s.label} style={{background:'white',padding:'10px',borderRadius:'6px',textAlign:'center'}}>
                  <div style={{fontSize:'20px',fontWeight:'bold',color:s.color}}>{s.value}</div>
                  <div style={{fontSize:'11px',color:'#666',marginTop:'2px'}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={()=>{if(window.confirm(lang==='en'?'Are you sure you want to logout?':'Una uhakika unataka kutoka?')){supabase.auth.signOut();setPage('login');setCurrentUser(null);}}}
            style={{width:'100%',padding:'12px',background:'#fee2e2',color:'#dc2626',border:'2px solid #fca5a5',borderRadius:'8px',cursor:'pointer',fontWeight:'bold',fontSize:'14px'}}>
            🚪 {lang==='en'?'Logout from System':'Toka kwenye Mfumo'}
          </button>
        </div>
      </div>
    )}
  </div>
)}

        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a1628,#1a2f55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button onClick={() => setLang(lang === 'en' ? 'sw' : 'en')} style={{ background: '#c9a84c', color: 'white', border: 'none', borderRadius: '20px', padding: '6px 16px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
            {lang === 'en' ? '🇹🇿 Swahili' : '🇬🇧 English'}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '80px', height: '80px', background: '#0a1628', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontWeight: 'bold', fontSize: '24px' }}>JCL</div>
          <h2 style={{ color: '#0a1628', margin: '0 0 4px', fontSize: '18px' }}>JOLEO COMPANY LIMITED</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>{lang === 'en' ? 'Supply Management System' : 'Mfumo wa Usimamizi wa Ugavi'}</p>
        </div>
        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>{lang === 'en' ? 'Email Address' : 'Barua Pepe'}</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', boxSizing: 'border-box', fontSize: '14px' }} />
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>{lang === 'en' ? 'Password' : 'Nywila'}</label>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ width: '100%', padding: '12px 44px 12px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
          <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>{show ? '🙈' : '👁️'}</button>
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#9ca3af' : '#0a1628', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px' }}>
          {loading ? (lang === 'en' ? 'Signing in...' : 'Inaingia...') : (lang === 'en' ? 'Sign In' : 'Ingia')}
        </button>
        <div style={{ textAlign: 'center' }}>
          <a href="#" style={{ color: '#c9a84c', fontSize: '13px', textDecoration: 'none' }}>{lang === 'en' ? 'Forgot Password?' : 'Umesahau Nywila?'}</a>
        </div>
      </div>
    </div>
  );
};
