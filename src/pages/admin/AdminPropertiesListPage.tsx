import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useProperties } from '../../hooks/useProperties';
import { useNavigate, Link } from '../../routes/router';
import { useUI } from '../../hooks/useUI';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatPrice } from '../../utils/formatters';
import { Property, PropertyStatus } from '../../types/property';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle2,
  Building
} from 'lucide-react';

export const AdminPropertiesListPage: React.FC = () => {
  const { properties, deleteProperty, updateProperty } = useProperties();
  const navigate = useNavigate();
  const { showToast } = useUI();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.propertyType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id);
      showToast('Property deleted successfully', 'success');
      setPropertyToDelete(null);
    } catch (err) {
      showToast('Failed to delete property', 'error');
    }
  };

  const handleStatusChange = async (property: Property, newStatus: PropertyStatus) => {
    try {
      await updateProperty(property.id, { status: newStatus });
      showToast(`Status updated to "${newStatus}"`, 'success');
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleToggleFeatured = async (property: Property) => {
    try {
      await updateProperty(property.id, { featured: !property.featured });
      showToast(
        property.featured ? 'Removed from featured list' : 'Marked as featured property',
        'success'
      );
    } catch (err) {
      showToast('Failed to update featured flag', 'error');
    }
  };

  return (
    <AdminLayout
      pageTitle="Property Management"
      actionButton={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/admin/properties/new')}
          leftIcon={<Plus className="w-4 h-4 mr-1 text-emerald-400" />}
        >
          Add New Property
        </Button>
      }
    >
      <div className="flex flex-col gap-6 text-left">
        
        {/* Search & Status Filters */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, location, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] transition-all w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Under Offer">Under Offer</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        {/* Properties Table Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 sm:p-5">Listing</th>
                  <th className="p-4 sm:p-5">Type & Location</th>
                  <th className="p-4 sm:p-5">Price</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-center">Featured</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <Building className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                      No properties found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((property) => {
                    const coverImg = property.images[0]?.url;
                    return (
                      <tr key={property.id} className="hover:bg-stone-50/50 transition-colors">
                        {/* Thumbnail & Title */}
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={coverImg}
                              alt={property.title}
                              className="w-14 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 truncate max-w-[220px]">
                                {property.title}
                              </h4>
                              <span className="text-xs text-slate-400 font-mono">
                                ID: {property.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Type & Location */}
                        <td className="p-4 sm:p-5">
                          <div className="font-medium text-slate-800">{property.propertyType}</div>
                          <div className="text-xs text-slate-500">{property.location}, {property.city}</div>
                        </td>

                        {/* Price */}
                        <td className="p-4 sm:p-5 font-bold text-[#0f383c]">
                          {formatPrice(property.price)}
                        </td>

                        {/* Status dropdown */}
                        <td className="p-4 sm:p-5">
                          <select
                            value={property.status}
                            onChange={(e) => handleStatusChange(property, e.target.value as PropertyStatus)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f383c]"
                          >
                            <option value="Available">Available</option>
                            <option value="Under Offer">Under Offer</option>
                            <option value="Sold">Sold</option>
                          </select>
                        </td>

                        {/* Featured Toggle */}
                        <td className="p-4 sm:p-5 text-center">
                          <button
                            onClick={() => handleToggleFeatured(property)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              property.featured
                                ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                                : 'text-slate-300 hover:text-slate-500'
                            }`}
                            title={property.featured ? 'Featured on homepage' : 'Click to feature on homepage'}
                          >
                            <Star className="w-5 h-5 fill-current" />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-4 sm:p-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to={`/properties/${property.id}`}
                              target="_blank"
                              className="p-2 rounded-lg text-slate-400 hover:text-[#0f383c] hover:bg-stone-100 transition-colors"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => navigate(`/admin/properties/${property.id}/edit`)}
                              className="p-2 rounded-lg text-slate-600 hover:text-[#0f383c] hover:bg-stone-100 transition-colors"
                              title="Edit Property"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setPropertyToDelete(property)}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {propertyToDelete && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Property Listing?</h3>
              <p className="text-sm text-slate-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-900">"{propertyToDelete.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setPropertyToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => handleDelete(propertyToDelete.id)}
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
