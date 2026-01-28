'use client';

import { useState, useEffect, FormEvent } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
// import { BlogPost } from '@/lib/blogPosts';

interface Comment {
  id: number;
  authorName: string;
  authorEmail: string | null;
  website: string | null;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

interface CommentSectionProps {
  post: any;
}

export default function CommentSection({ post }: CommentSectionProps) {
  // const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', // session?.user?.name || '',
    email: '', // session?.user?.email || '',
    website: '',
    content: '',
  });

  // Update form data when session changes
  useEffect(() => {
    //  if (session?.user) {
  //     setFormData(prev => ({
  //       ...prev,
  //       name: session.user?.name || prev.name,
  //       email: session.user?.email || prev.email,
  //     }));
  //   // }
  }, []);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/blog/${post.slug}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (post.slug) {
      fetchComments();
    }
  }, [post.slug]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch(`/api/blog/${post.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          content: formData.content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit comment');
        return;
      }

      // Add new comment to the list
      setComments(prev => [data.comment, ...prev]);
      
      // Reset form
      setFormData({
        name: '', // session?.user?.name || '',
        email: '', // session?.user?.email || '',
        website: '',
        content: '',
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Refresh the page to update comment count
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className="author-comment">
        <div className="back-title back-small-title">
          <h2>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h2>
        </div>
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <div className="row">
                  <div className="col-lg-1">
                    <div className="image-comments">
                      {comment.user?.image ? (
                        <Image src={comment.user.image} alt={comment.authorName}
                  width={800}
                  height={600}
                />
                      ) : (
                        <div className="comment-avatar-placeholder">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-11">
                    <div className="dsc-comments">
                      <h6>
                        {comment.website ? (
                          <a href={comment.website} target="_blank" rel="noopener noreferrer">
                            {comment.authorName}
                          </a>
                        ) : (
                          comment.authorName
                        )}
                      </h6>
                      <span className="reply">
                        <span className="date">{formatDate(comment.createdAt)}</span>
                      </span>
                      <p>{comment.content}</p>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="back-blog-form">
        <div id="blog-form" className="blog-form">
          <div className="back-title back-small-title">
            <h2>Leave a Reply</h2>
          </div>
          {error && (
            <div className="comment-error-message">
              {error}
            </div>
          )}
          {success && (
            <div className="comment-success-message">
              Your comment has been submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="back-textarea">
                  <textarea
                    name="content"
                    placeholder="Message"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="back-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={false} // !!session?.user?.name
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="back-input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={false} // !!session?.user?.email
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="back-input">
                  <input
                    type="text"
                    name="website"
                    placeholder="Website (optional)"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="back-check-box">
                  <input type="checkbox" id="box-1" /> Save my name, email, and website in this browser for the next time I comment.
                </div>
                <button
                  type="submit"
                  className="back-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Comment'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

