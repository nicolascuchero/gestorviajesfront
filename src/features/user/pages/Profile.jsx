import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Modal from '../../../components/Modal.jsx';
import Loading from '../../../components/atoms/Loading';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBell, FaBuilding, FaLink } from 'react-icons/fa';

export default function Profile() {
  const navigate = useNavigate();
  const { usuario, cargando, logout } = useAuth();

  // Estado para modal, formulario y feedback
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    email: usuario?.email || '',
    telefono: usuario?.telefono || ''
  });
  const [emailForm, setEmailForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    secondaryEmail: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    bookingConfirmations: true,
    priceAlerts: true,
    travelUpdates: true,
    newsletter: false
  });
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      role: 'Manager',
      email: 'manager@techcorp.com',
      phone: '+1 555-0123',
      address: '123 Business St, Tech City',
      isActive: true
    },
    {
      id: 2,
      name: 'Travel Agency Pro',
      role: 'Consultant',
      email: 'consultant@travelpro.com',
      phone: '+1 555-0456',
      address: '456 Travel Ave, Tourism Town',
      isActive: false
    }
  ]);
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    address: ''
  });
  const [integrations, setIntegrations] = useState({
    googleCalendar: { connected: false, email: '' },
    outlook: { connected: false, email: '' },
    slack: { connected: false, workspace: '' },
    trello: { connected: false, board: '' },
    github: { connected: false, username: '' }
  });
  const [feedback, setFeedback] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial del perfil
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 segundos de carga

    return () => clearTimeout(timer);
  }, []);

  // Cerrar sesión
  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  // Abrir modal y resetear formulario
  const handleEditClick = () => {
    setForm({
      nombre: usuario?.nombre || '',
      apellido: usuario?.apellido || '',
      email: usuario?.email || '',
      telefono: usuario?.telefono || ''
    });
    setIsModalOpen(true);
    setFeedback('');
  };

  // Cambiar sección activa
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setFeedback('');
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar cambios en el formulario de emails
  const handleEmailChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  // Manejar cambio de foto de perfil
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Guardar cambios de contraseña y email
  const handleEmailSave = (e) => {
    e.preventDefault();
    setGuardando(true);
    
    // Validaciones básicas
    if (emailForm.newPassword !== emailForm.confirmPassword) {
      setFeedback('Las contraseñas no coinciden');
      setGuardando(false);
      return;
    }
    
    if (emailForm.newPassword && emailForm.newPassword.length < 6) {
      setFeedback('La nueva contraseña debe tener al menos 6 caracteres');
      setGuardando(false);
      return;
    }
    
    // Simulación de guardado
    setTimeout(() => {
      setFeedback('¡Configuración de email y contraseña actualizada! (solo frontend)');
      setEmailForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        secondaryEmail: ''
      });
      setGuardando(false);
    }, 1500);
  };

  // Manejar cambios en configuraciones de notificaciones
  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Guardar configuraciones de notificaciones
  const handleNotificationSave = (e) => {
    e.preventDefault();
    setGuardando(true);
    
    // Simulación de guardado
    setTimeout(() => {
      setFeedback('¡Configuración de notificaciones actualizada! (solo frontend)');
      setGuardando(false);
    }, 1500);
  };

  // Manejar cambios en el formulario de nueva empresa
  const handleBusinessChange = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };

  // Agregar nueva empresa
  const handleAddBusiness = (e) => {
    e.preventDefault();
    if (!newBusiness.name || !newBusiness.role || !newBusiness.email) {
      setFeedback('Por favor completa los campos obligatorios');
      return;
    }

    const business = {
      id: Date.now(),
      ...newBusiness,
      isActive: true
    };

    setBusinesses([...businesses, business]);
    setNewBusiness({ name: '', role: '', email: '', phone: '', address: '' });
    setFeedback('¡Empresa agregada exitosamente! (solo frontend)');
  };

  // Cambiar estado de empresa
  const toggleBusinessStatus = (id) => {
    setBusinesses(businesses.map(business => 
      business.id === id ? { ...business, isActive: !business.isActive } : business
    ));
  };

  // Eliminar empresa
  const deleteBusiness = (id) => {
    setBusinesses(businesses.filter(business => business.id !== id));
    setFeedback('¡Empresa eliminada exitosamente! (solo frontend)');
  };

  // Guardar cambios de empresas
  const handleBusinessSave = () => {
    setGuardando(true);
    setTimeout(() => {
      setFeedback('¡Configuración de empresas actualizada! (solo frontend)');
      setGuardando(false);
    }, 1500);
  };

  // Manejar cambios en integraciones
  const handleIntegrationChange = (service, field, value) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  // Conectar/desconectar integración
  const toggleIntegration = (service) => {
    setGuardando(true);
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [service]: {
          ...prev[service],
          connected: !prev[service].connected
        }
      }));
      setFeedback(`¡${integrations[service].connected ? 'Desconectado' : 'Conectado'} exitosamente con ${service}! (solo frontend)`);
      setGuardando(false);
    }, 1500);
  };

  // Guardar configuraciones de integración
  const handleIntegrationSave = () => {
    setGuardando(true);
    setTimeout(() => {
      setFeedback('¡Configuración de integraciones actualizada! (solo frontend)');
      setGuardando(false);
    }, 1500);
  };

  // Guardar cambios del formulario
  const handleSave = (e) => {
    e.preventDefault();
    setGuardando(true);
    // Simulación de guardado (aquí iría la lógica real)
    setTimeout(() => {
      setFeedback('¡Perfil actualizado con éxito! (solo frontend)');
      setIsModalOpen(false);
      setGuardando(false);
    }, 1500);
  };

  // Renderizar sección activa
  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Informacion Personal</h1>
              {guardando && (
                <div className="text-green-500 text-sm flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
                  Saving changes...
                </div>
              )}
            </div>

            {/* Avatar y datos básicos */}
            <div className="flex items-center gap-4 mt-6 mb-8">
              <div className="h-20 w-20 rounded-full bg-gray-200 shadow overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-3xl font-bold">
                    {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">{usuario?.nombre} {usuario?.apellido}</p>
                <p className="text-sm text-gray-500">{usuario?.email}</p>
              </div>
            </div>

            {/* Formulario principal (editable) */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSave}>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="First Name"
                className="border border-gray-300 px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Last Name"
                className="border border-gray-300 px-4 py-2 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-gray-300 px-4 py-2 rounded-md"
                required
              />
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-gray-300 px-4 py-2 rounded-md"
              />
              <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-400"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                >
                  Cerrar sesión
                </button>
              </div>
            </form>

            {feedback && <div className="mt-4 text-green-600 font-medium">{feedback}</div>}
          </>
        );
      
      case 'emails':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Email y Contraseña</h1>
              {guardando && (
                <div className="text-green-500 text-sm flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
                  Saving changes...
                </div>
              )}
            </div>
            
            <form onSubmit={handleEmailSave} className="space-y-6">
              {/* Email principal */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Email Principal</h3>
                <p className="text-gray-600">{usuario?.email}</p>
                <p className="text-sm text-gray-500 mt-1">Este es tu email principal y no se puede cambiar desde aquí.</p>
              </div>

              {/* Email secundario */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Email Secundario</h3>
                <input
                  type="email"
                  name="secondaryEmail"
                  value={emailForm.secondaryEmail}
                  onChange={handleEmailChange}
                  placeholder="Email secundario (opcional)"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">Puedes agregar un email secundario para recibir notificaciones.</p>
              </div>

              {/* Cambio de contraseña */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Cambiar Contraseña</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    name="currentPassword"
                    value={emailForm.currentPassword}
                    onChange={handleEmailChange}
                    placeholder="Contraseña actual"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={emailForm.newPassword}
                    onChange={handleEmailChange}
                    placeholder="Nueva contraseña"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={emailForm.confirmPassword}
                    onChange={handleEmailChange}
                    placeholder="Confirmar nueva contraseña"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Deja en blanco si no quieres cambiar la contraseña.</p>
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-400"
              >
                Guardar cambios
              </button>
            </form>

            {feedback && (
              <div className={`mt-4 p-3 rounded ${feedback.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {feedback}
              </div>
            )}
          </div>
        );
      
      case 'notifications':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
              {guardando && (
                <div className="text-green-500 text-sm flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
                  Saving changes...
                </div>
              )}
            </div>
            
            <form onSubmit={handleNotificationSave} className="space-y-6">
              {/* Configuraciones generales */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Configuraciones Generales</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Notificaciones por Email</p>
                      <p className="text-sm text-gray-500">Recibe notificaciones importantes por email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleNotificationChange('emailNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Notificaciones Push</p>
                      <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={() => handleNotificationChange('pushNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Notificaciones SMS</p>
                      <p className="text-sm text-gray-500">Recibe alertas importantes por SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={() => handleNotificationChange('smsNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Tipos de notificaciones */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Tipos de Notificaciones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Confirmaciones de Reserva</p>
                      <p className="text-sm text-gray-500">Recibe confirmaciones cuando hagas una reserva</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.bookingConfirmations}
                        onChange={() => handleNotificationChange('bookingConfirmations')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Alertas de Precio</p>
                      <p className="text-sm text-gray-500">Te notificamos cuando bajen los precios</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.priceAlerts}
                        onChange={() => handleNotificationChange('priceAlerts')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Actualizaciones de Viaje</p>
                      <p className="text-sm text-gray-500">Cambios en horarios o estado de tu viaje</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.travelUpdates}
                        onChange={() => handleNotificationChange('travelUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Marketing</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Emails de Marketing</p>
                      <p className="text-sm text-gray-500">Ofertas especiales y promociones</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => handleNotificationChange('marketingEmails')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Newsletter</p>
                      <p className="text-sm text-gray-500">Recibe nuestro newsletter mensual</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newsletter}
                        onChange={() => handleNotificationChange('newsletter')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-400"
              >
                Guardar configuraciones
              </button>
            </form>

            {feedback && (
              <div className={`mt-4 p-3 rounded ${feedback.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {feedback}
              </div>
            )}
          </div>
        );
      
      case 'businesses':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Empresas</h1>
              {guardando && (
                <div className="text-green-500 text-sm flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
                  Saving changes...
                </div>
              )}
            </div>
            
            {/* Lista de empresas */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Empresas Asociadas</h3>
              <div className="space-y-4">
                {businesses.map(business => (
                  <div key={business.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{business.name}</h4>
                        <p className="text-sm text-gray-600">{business.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          business.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {business.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                        <button
                          onClick={() => toggleBusinessStatus(business.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {business.isActive ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => deleteBusiness(business.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p><span className="font-medium">Email:</span> {business.email}</p>
                      <p><span className="font-medium">Teléfono:</span> {business.phone}</p>
                      <p className="md:col-span-2"><span className="font-medium">Dirección:</span> {business.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario para agregar empresa */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Agregar Nueva Empresa</h3>
              <form onSubmit={handleAddBusiness} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={newBusiness.name}
                  onChange={handleBusinessChange}
                  placeholder="Nombre de la empresa *"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="role"
                  value={newBusiness.role}
                  onChange={handleBusinessChange}
                  placeholder="Tu rol en la empresa *"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={newBusiness.email}
                  onChange={handleBusinessChange}
                  placeholder="Email de contacto *"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={newBusiness.phone}
                  onChange={handleBusinessChange}
                  placeholder="Teléfono de contacto"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <input
                  type="text"
                  name="address"
                  value={newBusiness.address}
                  onChange={handleBusinessChange}
                  placeholder="Dirección de la empresa"
                  className="border border-gray-300 px-4 py-2 rounded-md md:col-span-2"
                />
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-400"
                  >
                    Agregar Empresa
                  </button>
                </div>
              </form>
            </div>

            {feedback && (
              <div className={`mt-4 p-3 rounded ${feedback.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {feedback}
              </div>
            )}
          </div>
        );
      
      case 'integration':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Integraciones</h1>
              {guardando && (
                <div className="text-green-500 text-sm flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
                  Saving changes...
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Google Calendar */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Google Calendar</h3>
                      <p className="text-sm text-gray-500">Sincroniza tus reservas con Google Calendar</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration('googleCalendar')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      integrations.googleCalendar.connected
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {integrations.googleCalendar.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
                {integrations.googleCalendar.connected && (
                  <div className="mt-4">
                    <input
                      type="email"
                      value={integrations.googleCalendar.email}
                      onChange={(e) => handleIntegrationChange('googleCalendar', 'email', e.target.value)}
                      placeholder="Email de Google Calendar"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Outlook */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      O
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Outlook</h3>
                      <p className="text-sm text-gray-500">Sincroniza con tu calendario de Outlook</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration('outlook')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      integrations.outlook.connected
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {integrations.outlook.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
                {integrations.outlook.connected && (
                  <div className="mt-4">
                    <input
                      type="email"
                      value={integrations.outlook.email}
                      onChange={(e) => handleIntegrationChange('outlook', 'email', e.target.value)}
                      placeholder="Email de Outlook"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Slack */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Slack</h3>
                      <p className="text-sm text-gray-500">Recibe notificaciones en Slack</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration('slack')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      integrations.slack.connected
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {integrations.slack.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
                {integrations.slack.connected && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={integrations.slack.workspace}
                      onChange={(e) => handleIntegrationChange('slack', 'workspace', e.target.value)}
                      placeholder="Nombre del workspace de Slack"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Trello */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      T
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Trello</h3>
                      <p className="text-sm text-gray-500">Crea tarjetas automáticamente en Trello</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration('trello')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      integrations.trello.connected
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {integrations.trello.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
                {integrations.trello.connected && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={integrations.trello.board}
                      onChange={(e) => handleIntegrationChange('trello', 'board', e.target.value)}
                      placeholder="Nombre del tablero de Trello"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* GitHub */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">GitHub</h3>
                      <p className="text-sm text-gray-500">Conecta con tu repositorio de GitHub</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration('github')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      integrations.github.connected
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {integrations.github.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
                {integrations.github.connected && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={integrations.github.username}
                      onChange={(e) => handleIntegrationChange('github', 'username', e.target.value)}
                      placeholder="Nombre de usuario de GitHub"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleIntegrationSave}
                className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-400"
              >
                Guardar configuraciones
              </button>
            </div>

            {feedback && (
              <div className={`mt-4 p-3 rounded ${feedback.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {feedback}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Loading inicial del perfil
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loading size="lg" text="Cargando perfil..." color="blue" />
      </div>
    );
  }

  // Loading
  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // No autenticado
  if (!usuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
        <p>
          No has iniciado sesión.{' '}
          <Link to="/login" className="text-indigo-600 underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    );
  }

  // Render principal
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen bg-gradient-to-b from-indigo-700 to-blue-600 shadow-xl flex flex-col items-center py-10 px-4">
        <h2 className="font-bold text-2xl text-white mb-10 tracking-wide">Mi Perfil</h2>
        <ul className="space-y-4 w-full">
          <li
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-lg font-medium ${activeSection === 'personal' ? 'bg-white/20 text-white shadow-lg' : 'text-indigo-100 hover:bg-white/10'}`}
            onClick={() => handleSectionChange('personal')}
          >
            <FaUser className="text-2xl" />
            <span>Perfil</span>
          </li>
          <li
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-lg font-medium ${activeSection === 'emails' ? 'bg-white/20 text-white shadow-lg' : 'text-indigo-100 hover:bg-white/10'}`}
            onClick={() => handleSectionChange('emails')}
          >
            <FaEnvelope className="text-2xl" />
            <span>Email</span>
          </li>
          <li
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-lg font-medium ${activeSection === 'notifications' ? 'bg-white/20 text-white shadow-lg' : 'text-indigo-100 hover:bg-white/10'}`}
            onClick={() => handleSectionChange('notifications')}
          >
            <FaBell className="text-2xl" />
            <span>Notificaciones</span>
          </li>
          <li
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-lg font-medium ${activeSection === 'businesses' ? 'bg-white/20 text-white shadow-lg' : 'text-indigo-100 hover:bg-white/10'}`}
            onClick={() => handleSectionChange('businesses')}
          >
            <FaBuilding className="text-2xl" />
            <span>Empresas</span>
          </li>
          <li
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-lg font-medium ${activeSection === 'integration' ? 'bg-white/20 text-white shadow-lg' : 'text-indigo-100 hover:bg-white/10'}`}
            onClick={() => handleSectionChange('integration')}
          >
            <FaLink className="text-2xl" />
            <span>Integraciones</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white rounded-r-3xl shadow-xl p-0 overflow-auto">
        {/* Header visual */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 py-12 flex items-center px-16 shadow-md">
          <div className="absolute left-0 top-0 w-full h-full opacity-10 bg-[url('/Avion.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
          <div className="flex items-center gap-8 z-10">
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-tr from-indigo-500 to-purple-500">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span>{usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow mb-1">{usuario?.nombre} {usuario?.apellido}</h1>
              <p className="text-lg text-indigo-100 font-medium mb-2">{usuario?.email}</p>
              <button
                onClick={handleEditClick}
                className="bg-white/80 hover:bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg shadow transition-all border border-indigo-200"
              >
                Editar perfil
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-10">
          {renderSection()}
        </div>
      </main>

      {/* Modal de edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar perfil">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Foto de perfil
            <input type="file" accept="image/*" onChange={handleFotoChange} className="border rounded px-3 py-2 text-gray-900" />
          </label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border rounded px-3 py-2 text-gray-900" required />
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" className="border rounded px-3 py-2 text-gray-900" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2 text-gray-900" required />
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="border rounded px-3 py-2 text-gray-900" />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Guardar</button>
            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
