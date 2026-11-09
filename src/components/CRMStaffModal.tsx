import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Users, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Download, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { CRMContact } from '../types';
import { formatCOP } from '../utils/booking';

interface CRMStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: CRMContact[];
  onUpdateStatus: (id: string, newStatus: CRMContact['status']) => void;
}

export const CRMStaffModal: React.FC<CRMStaffModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed'>('all');
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(contacts[0] || null);
  const [syncFeedback, setSyncFeedback] = useState(false);

  if (!isOpen) return null;

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSimulateSync = () => {
    setSyncFeedback(true);
    setTimeout(() => setSyncFeedback(false), 2000);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Cliente', 'Celular', 'Email', 'Mascota', 'Servicio', 'Fecha', 'Hora', 'Total COP', 'Estado'];
    const rows = contacts.map((c) => [
      c.id,
      `"${c.clientName}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.petName} (${c.petBreed})"`,
      `"${c.service}"`,
      c.appointmentDate,
      c.appointmentTime,
      c.totalCOP,
      c.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `crm_pet_house_monteria_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#10131d] border-2 border-gray-700 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#161a29] border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  CRM & Portal de Gestión de Citas
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                  HubSpot / VetDB Sincronizado
                </span>
              </div>
              <p className="text-xs text-gray-400">
                PET HOUSE CLUB · Panel del Staff Administrativo en Montería
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateSync}
              className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 hover:text-white border border-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncFeedback ? 'animate-spin text-[#00f0ff]' : ''}`} />
              <span>{syncFeedback ? 'Sincronizado!' : 'Sync CRM'}</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-semibold text-[#00f0ff] border border-cyan-800/60 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Cerrar panel CRM"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and search bar */}
        <div className="p-4 bg-[#0d0f17] border-b border-gray-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, mascota o celular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#161928] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#161928] border border-gray-700 text-white text-xs font-medium focus:outline-none focus:border-[#00f0ff]"
            >
              <option value="all">Todos los estados ({contacts.length})</option>
              <option value="confirmed">Confirmadas</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
        </div>

        {/* 2-Column CRM Workspace Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          
          {/* Left Column: Contact & Booking Records List */}
          <div className="md:col-span-5 overflow-y-auto max-h-[500px] p-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                No se encontraron registros con los filtros actuales.
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedContact?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedContact(item)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#181c2c] border-[#ff2a85] shadow-[0_0_15px_rgba(255,42,133,0.25)]'
                        : 'bg-[#12141f] border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        {item.clientName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          item.status === 'confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : item.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="text-[#00f0ff] font-semibold">
                        🐾 {item.petName} ({item.petBreed})
                      </span>
                      <span className="font-mono text-gray-300">{item.appointmentDate}</span>
                    </div>

                    <div className="text-[11px] text-gray-400 mt-1 truncate">
                      {item.service}
                    </div>

                    {item.includesDelivery && (
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#ffd600]">
                        <Truck className="w-3 h-3" />
                        <span>Domicilio en {item.neighborhood || 'Montería'}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Contact Details & Status Changer */}
          <div className="md:col-span-7 overflow-y-auto max-h-[500px] p-6 bg-[#0e1017]">
            {selectedContact ? (
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-gray-800">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block">ID: {selectedContact.id}</span>
                    <h4 className="font-display text-xl font-bold text-white">
                      {selectedContact.clientName}
                    </h4>
                    <p className="text-xs text-[#00f0ff] font-semibold mt-0.5">
                      Tutor de {selectedContact.petName} ({selectedContact.petType === 'dog' ? 'Perro' : 'Gato'} - {selectedContact.petBreed})
                    </p>
                  </div>

                  {/* Status dropdown updater */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Estado de la Cita:
                    </label>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as CRMContact['status'];
                        onUpdateStatus(selectedContact.id, newStatus);
                        setSelectedContact({ ...selectedContact, status: newStatus });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#191c2b] border border-gray-700 text-xs font-bold text-white focus:outline-none focus:border-[#ffd600]"
                    >
                      <option value="confirmed">Confirmada</option>
                      <option value="pending">Pendiente</option>
                      <option value="in_service">En Servicio en Club</option>
                      <option value="completed">Completada</option>
                    </select>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#141724] border border-gray-800">
                    <span className="text-gray-400 flex items-center gap-1 mb-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      Celular / WhatsApp:
                    </span>
                    <a
                      href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold hover:text-emerald-400 hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141724] border border-gray-800">
                    <span className="text-gray-400 flex items-center gap-1 mb-1">
                      <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                      Correo Electrónico:
                    </span>
                    <span className="text-white font-semibold truncate block">
                      {selectedContact.email}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141724] border border-gray-800">
                    <span className="text-gray-400 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ff2a85]" />
                      Fecha & Horario:
                    </span>
                    <span className="text-white font-bold">
                      {selectedContact.appointmentDate} · {selectedContact.appointmentTime}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141724] border border-gray-800">
                    <span className="text-gray-400 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
                      Total Liquidado:
                    </span>
                    <span className="text-[#ffd600] font-extrabold text-sm">
                      {formatCOP(selectedContact.totalCOP)}
                    </span>
                  </div>
                </div>

                {/* Delivery details if applicable */}
                {selectedContact.includesDelivery && (
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs">
                    <span className="text-[#ffd600] font-bold flex items-center gap-1.5 mb-1">
                      <Truck className="w-4 h-4" />
                      Servicio a Domicilio en Montería:
                    </span>
                    <p className="text-gray-200">
                      Barrio: <strong>{selectedContact.neighborhood}</strong>
                    </p>
                    <p className="text-gray-300">
                      Dirección: {selectedContact.address || 'Pendiente por confirmar en WhatsApp'}
                    </p>
                  </div>
                )}

                {/* Notes and Historic log */}
                <div className="p-4 rounded-2xl bg-[#141724] border border-gray-800">
                  <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5 mb-2">
                    <FileText className="w-4 h-4 text-[#00f0ff]" />
                    Notas del Cliente & Registro Histórico:
                  </span>
                  <div className="text-xs text-gray-300 bg-[#0d0f17] p-3 rounded-xl border border-gray-800 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                    {selectedContact.notes}
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500">
                    Origen: {selectedContact.source} · Creado el {selectedContact.createdAt}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-xs">
                Selecciona un contacto de la lista para ver su ficha técnica completa.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
