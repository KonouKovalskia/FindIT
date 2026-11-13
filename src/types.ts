export type ReportType = 'hilang' | 'ditemukan';

export type ReportStatus = 'aktif' | 'diklaim' | 'selesai' | 'arsip';

export type ClaimStatus = 'waiting' | 'approved' | 'rejected';

export interface TimelineEvent {
  title: string;
  time: string;
  author?: string;
  statusType?: 'default' | 'active' | 'claim' | 'success';
}

export interface ReportItem {
  id: string; // e.g. "LAP-20251025-042"
  title: string;
  type: ReportType;
  status: ReportStatus;
  category: string;
  categoryLabel: string;
  description: string;
  locationBuilding: string;
  locationBuildingLabel: string;
  locationDetail: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  eventDate: string; // ISO date or display string
  reportedAtDisplay: string;
  daysRemaining?: number;
  images: string[];
  primaryImage: string;
  reporter: {
    name: string;
    nim: string;
    major: string;
    reputationScore: number;
    isVerifiedSSO: boolean;
    avatar: string;
    phone?: string;
  };
  isUrgent?: boolean;
  rewardNote?: string;
  storageLocationNotice?: string;
  pendingClaimsCount?: number;
  timeline?: TimelineEvent[];
  approvedClaimUser?: {
    name: string;
    nim: string;
  };
}

export interface ClaimItem {
  id: string; // e.g. "KLM-9421"
  reportId: string;
  itemTitle: string;
  category: string;
  location: string;
  eventDate: string;
  imageUrl: string;
  status: ClaimStatus;
  submittedCharacteristics: string;
  submittedAt: string;
  reviewTimeEst?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  contactNumber?: string;
  pickupLocation?: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
}

export interface FilterOptions {
  searchQuery: string;
  type: 'all' | 'hilang' | 'ditemukan';
  category: string;
  building: string;
  dateFrom: string;
  dateTo: string;
}
